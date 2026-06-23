import { test } from 'node:test';
import assert from 'node:assert';
import nodemailer from 'nodemailer';

// Create a mock sendMail function
let sentEmailOptions: any = null;
const mockSendMail = (options: any, callback: any) => {
  sentEmailOptions = options;
  callback(null, { response: '250 OK' });
};

// Override nodemailer.createTransport before importing services
nodemailer.createTransport = (() => {
  return {
    use: () => {},
    sendMail: mockSendMail
  };
}) as any;

// Now import the handler
import { handleMessage } from './kafka.consumer.js';

test('handleMessage processes user.account.created and triggers email communication', async () => {
  sentEmailOptions = null;

  const payload = {
    email: 'newuser@example.com',
    username: 'john_doe',
    type: 'email',
    context: {
      extraField: 'test-value'
    }
  };

  await handleMessage('user.account.created', JSON.stringify(payload));

  assert.ok(sentEmailOptions, 'Email should have been sent');
  assert.strictEqual(sentEmailOptions.to, 'newuser@example.com');
  assert.strictEqual(sentEmailOptions.template, 'welcome');
  assert.strictEqual(sentEmailOptions.context.name, 'john_doe');
  assert.strictEqual(sentEmailOptions.context.extraField, 'test-value');
});

test('handleMessage ignores invalid JSON payload gracefully', async () => {
  sentEmailOptions = null;
  await handleMessage('user.account.created', 'invalid-json');
  assert.strictEqual(sentEmailOptions, null);
});

test('handleMessage ignores payload without email/recipient', async () => {
  sentEmailOptions = null;
  await handleMessage('user.account.created', JSON.stringify({ username: 'no_email' }));
  assert.strictEqual(sentEmailOptions, null);
});
