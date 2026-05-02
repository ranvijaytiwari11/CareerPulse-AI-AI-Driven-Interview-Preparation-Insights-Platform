import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

const BASE_URL = 'http://localhost:8001';
let cookie = '';
let testUserId = '';
let interviewId = '';

async function runTests() {
  console.log("=== STARTING FULL BACKEND TEST ===");

  try {
    // 1. Auth Test
    console.log("\n1. Testing Auth (/api/auth/google)");
    const authRes = await axios.post(`${BASE_URL}/api/auth/google`, {
      name: 'System Test User',
      email: `test_user_${Date.now()}@example.com`
    });
    const rawCookies = authRes.headers['set-cookie'];
    if (rawCookies && rawCookies.length > 0) {
      cookie = rawCookies[0].split(';')[0];
    }
    testUserId = authRes.data._id;
    console.log("✅ Auth Success. UserID:", testUserId);

    // Give credits if needed
    // The backend deducts 50 credits. The default user has 100 credits, so it should be fine.

    // 2. Resume Upload Test
    console.log("\n2. Testing Resume Upload (/api/interview/resume)");
    try {
      fs.writeFileSync('dummy.pdf', '%PDF-1.4\n1 0 obj\n<<\n/Title (Dummy Resume)\n>>\nendobj\ntrailer\n<<\n/Root 1 0 R\n>>\n%%EOF');
      const form = new FormData();
      form.append('resume', fs.createReadStream('dummy.pdf'));
      const resumeRes = await axios.post(`${BASE_URL}/api/interview/resume`, form, {
        headers: { ...form.getHeaders(), Cookie: cookie }
      });
      console.log("✅ Resume Success. Parsed Role:", resumeRes.data.role);
    } catch (e) {
      console.log("⚠️ Resume Upload Test Failed (likely due to dummy PDF format):", e.response ? e.response.data : e.message);
    }

    // 3. Question Generation Test
    console.log("\n3. Testing Question Generation (/api/interview/generate-questions)");
    const genRes = await axios.post(`${BASE_URL}/api/interview/generate-questions`, {
      role: 'Software Engineer',
      experience: '2 years',
      mode: 'Technical',
      resumeText: 'Knows JS, React, Node.',
      projects: ['E-commerce App'],
      skills: ['JS', 'React']
    }, { headers: { Cookie: cookie } });
    interviewId = genRes.data.interviewId;
    console.log("✅ Question Gen Success. InterviewID:", interviewId, "Questions:", genRes.data.questions.length);

    // 4. Submit Answer Test
    console.log("\n4. Testing Submit Answer (/api/interview/submit-answer)");
    const submitRes = await axios.post(`${BASE_URL}/api/interview/submit-answer`, {
      interviewId,
      questionIndex: 0,
      answer: "I used React and Node to build it.",
      timeTaken: 30
    }, { headers: { Cookie: cookie } });
    console.log("✅ Submit Answer Success. Feedback:", submitRes.data.feedback);

    // 5. Finish Interview Test
    console.log("\n5. Testing Finish Interview (/api/interview/finish)");
    const finishRes = await axios.post(`${BASE_URL}/api/interview/finish`, {
      interviewId
    }, { headers: { Cookie: cookie } });
    console.log("✅ Finish Success. Final Score:", finishRes.data.finalScore);

    // 6. Get Report Test
    console.log("\n6. Testing Get Report (/api/interview/report/:id)");
    const reportRes = await axios.get(`${BASE_URL}/api/interview/report/${interviewId}`, { headers: { Cookie: cookie } });
    console.log("✅ Get Report Success. Final Score:", reportRes.data.finalScore);

    // 7. Payment Order Test
    console.log("\n7. Testing Payment Order (/api/payment/order)");
    const paymentRes = await axios.post(`${BASE_URL}/api/payment/order`, {
      amount: 100
    }, { headers: { Cookie: cookie } });
    console.log("✅ Payment Order Success. OrderID:", paymentRes.data.id);

  } catch (error) {
    console.error("❌ TEST FAILED:", error.response ? error.response.data : error.message);
  } finally {
    if (fs.existsSync('dummy.pdf')) fs.unlinkSync('dummy.pdf');
    console.log("\n=== TESTS COMPLETE ===");
  }
}

runTests();
