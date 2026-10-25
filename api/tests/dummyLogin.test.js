import assert from 'node:assert';
import { test } from 'node:test';
import { userService } from '../src/services/userService.js';

test('Dummy Logins: student@xyphx.com logs in with student@123', async () => {
  const result = await userService.authenticate('student@xyphx.com', 'student@123', 'student');
  assert.ok(result);
  assert.strictEqual(result.email, 'student@xyphx.com');
  assert.strictEqual(result.role, 'student');
  assert.ok(result.token, 'Should return a valid JWT token');
});

test('Dummy Logins: company@xyphx.com logs in with company@123', async () => {
  const result = await userService.authenticate('company@xyphx.com', 'company@123', 'company');
  assert.ok(result);
  assert.strictEqual(result.email, 'company@xyphx.com');
  assert.strictEqual(result.role, 'company');
  assert.ok(result.token, 'Should return a valid JWT token');
});

test('Dummy Logins: admin@xyphx.com logs in with admin@123', async () => {
  const result = await userService.authenticate('admin@xyphx.com', 'admin@123', 'admin');
  assert.ok(result);
  assert.strictEqual(result.email, 'admin@xyphx.com');
  assert.strictEqual(result.role, 'admin');
  assert.ok(result.token, 'Should return a valid JWT token');
});

test('Dummy Logins: Rejects incorrect password for demo accounts', async () => {
  await assert.rejects(
    async () => {
      await userService.authenticate('student@xyphx.com', 'wrongpassword', 'student');
    },
    (err) => {
      assert.strictEqual(err.statusCode, 401);
      assert.strictEqual(err.message, 'Invalid email or password');
      return true;
    }
  );
});
