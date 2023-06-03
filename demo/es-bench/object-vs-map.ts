import {bench} from './bench.js';

const size = 1_000;

let userListRecord: Record<string, Record<string, string>> = {};
let userListMap = new Map<string, Map<string, string>>();

function test_make_map() {
  userListMap = new Map<string, Map<string, string>>();
  for (let i = size; i; i--) {
    const userId = 'user_' + i;

    const user = new Map();
    user.set('user', userId);
    user.set('fname', 'ali');
    user.set('lname', 'md');
    user.set('email', 'i@ali.md');
    user.set('token', '1234abcd');

    userListMap.set(userId, user);
  }
}

function test_make_obj() {
  userListRecord = {};
  for (let i = size; i; i--) {
    const userId = 'user_' + i;
    userListRecord[userId] = {
      user: userId,
      fname: 'ali',
      lname: 'md',
      email: 'i@ali.md',
      token: '1234abcd',
    };
  }
}

function test_access_map() {
  if (userListMap.get('user_' + size / 2)!.get('user') !== 'user_' + size / 2) throw new Error('not_match');
}

function test_access_obj() {
  if (userListRecord['user_' + size / 2]['user'] !== 'user_' + size / 2) throw new Error('not_match');
}

bench('test_make_map_1st', test_make_map, 10_000);
bench('test_make_obj_1st', test_make_obj, 10_000);
bench('test_access_map_1st', test_access_map, 10_000);
bench('test_access_obj_1st', test_access_obj, 10_000);

bench('test_make_map_2nd', test_make_map, 10_000);
bench('test_make_obj_2nd', test_make_obj, 10_000);
bench('test_access_map_2nd', test_access_map, 10_000);
bench('test_access_obj_2nd', test_access_obj, 10_000);

globalThis.document?.body.append(' Done. Check the console.');
