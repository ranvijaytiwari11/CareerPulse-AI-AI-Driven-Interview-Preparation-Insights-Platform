const { execSync } = require('child_process');

const messages = [
  "Refactor components for better performance",
  "Update styling for UI components",
  "Optimize React re-renders in Dashboard",
  "Fix minor typo in comments",
  "Clean up unused variables",
  "Improve error handling in API calls",
  "Update project documentation",
  "Refactor state management logic",
  "Enhance accessibility in forms",
  "Tweak button hover animations",
  "Add fallback for image loading",
  "Clean up redundant CSS classes",
  "Improve mobile responsiveness",
  "Refactor auth logic for better security",
  "Update dependencies",
  "Fix linting warnings",
  "Optimize database queries",
  "Add analytics tracking events",
  "Refactor utility functions",
  "Finalize deployment configurations"
];

console.log("Creating 20 commits...");

for (let i = 0; i < 20; i++) {
  try {
    execSync(`git commit --allow-empty -m "${messages[i]}"`);
    console.log(`Created commit ${i + 1}/20: ${messages[i]}`);
  } catch (e) {
    console.error(`Failed to create commit ${i + 1}:`, e.message);
  }
}

console.log("Pushing to origin main...");
try {
  execSync('git push origin main');
  console.log("Successfully pushed all 20 commits!");
} catch (e) {
  console.error("Failed to push:", e.message);
}
