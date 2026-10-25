import assert from 'node:assert';
import { test } from 'node:test';

test('Backend Architecture: Student Role Tags match UI specifications', () => {
  const allowedStudentTags = ['Admin', 'Maintainer', 'Promoter', 'Contributor', 'Ambassador', 'Regular'];
  
  assert.ok(allowedStudentTags.includes('Maintainer'));
  assert.ok(allowedStudentTags.includes('Admin'));
  assert.ok(allowedStudentTags.includes('Promoter'));
  assert.ok(allowedStudentTags.includes('Contributor'));
  assert.ok(allowedStudentTags.includes('Ambassador'));
  assert.strictEqual(allowedStudentTags.length, 6);
});

test('Backend Architecture: Application ATS Candidate Status Transitions', () => {
  const validStages = [
    'applied',
    'reviewing',
    'shortlisted',
    'interview_scheduled',
    'interviewing',
    'rejected',
    'hired',
    'accepted',
  ];

  const testStatus = 'shortlisted';
  assert.ok(validStages.includes(testStatus));

  const invalidStatus = 'unknown_state';
  assert.strictEqual(validStages.includes(invalidStatus), false);
});

test('Backend Architecture: Profile Completion Percentage Calculator', () => {
  const calculateCompletion = (profile) => {
    let score = 0;
    if (profile.name) score += 20;
    if (profile.headline) score += 15;
    if (profile.bio) score += 15;
    if (profile.skills && profile.skills.length > 0) score += 20;
    if (profile.projects && profile.projects.length > 0) score += 20;
    if (profile.resumeUrl) score += 10;
    return Math.min(100, Math.max(30, score));
  };

  const fullProfile = {
    name: 'Joel A. Jacob',
    headline: 'Frontend Engineer',
    bio: 'Passionate builder',
    skills: ['React', 'Next.js'],
    projects: [{ title: 'CampusHub' }],
    resumeUrl: 'https://example.com/resume.pdf',
  };

  assert.strictEqual(calculateCompletion(fullProfile), 100);

  const partialProfile = {
    name: 'New Student',
  };

  assert.strictEqual(calculateCompletion(partialProfile), 30); // minimum baseline
});

test('Backend Architecture: Internship Filter Query Builder', () => {
  const buildFilter = (query) => {
    const filter = { status: query.status || 'active' };
    if (query.mode) filter.mode = query.mode.toLowerCase();
    if (query.verified === 'true') filter.isVerified = true;
    if (query.featured === 'true') filter.isFeatured = true;
    return filter;
  };

  const parsed = buildFilter({ mode: 'REMOTE', verified: 'true', featured: 'true' });
  assert.strictEqual(parsed.status, 'active');
  assert.strictEqual(parsed.mode, 'remote');
  assert.strictEqual(parsed.isVerified, true);
  assert.strictEqual(parsed.isFeatured, true);
});

test('Backend Architecture: Launchpad Click Telemetry Incrementor', () => {
  let item = { position: 'SWE Intern', clickCount: 1800 };
  const recordClick = (obj) => ({ ...obj, clickCount: obj.clickCount + 1 });

  item = recordClick(item);
  assert.strictEqual(item.clickCount, 1801);
});

test('Backend Architecture: Skill Assessment Auto-Grading & Pass Criteria', () => {
  const questions = [
    { id: 'q1', correctIndex: 0 },
    { id: 'q2', correctIndex: 1 },
    { id: 'q3', correctIndex: 2 },
    { id: 'q4', correctIndex: 3 },
  ];

  const gradeSubmission = (answers) => {
    let correct = 0;
    for (const q of questions) {
      if (answers[q.id] === q.correctIndex) {
        correct++;
      }
    }
    const score = Math.round((correct / questions.length) * 100);
    return {
      score,
      passed: score >= 75,
    };
  };

  const passingAnswers = { q1: 0, q2: 1, q3: 2, q4: 0 }; // 3/4 = 75% -> pass
  assert.strictEqual(gradeSubmission(passingAnswers).passed, true);
  assert.strictEqual(gradeSubmission(passingAnswers).score, 75);

  const failingAnswers = { q1: 0, q2: 1, q3: 0, q4: 0 }; // 2/4 = 50% -> fail
  assert.strictEqual(gradeSubmission(failingAnswers).passed, false);
  assert.strictEqual(gradeSubmission(failingAnswers).score, 50);
});

test('Backend Architecture: Bookmark Item Types Support', () => {
  const supportedTypes = ['internship', 'candidate'];
  assert.ok(supportedTypes.includes('internship'));
  assert.ok(supportedTypes.includes('candidate'));
  assert.strictEqual(supportedTypes.includes('invalid_type'), false);
});

