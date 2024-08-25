import { Todo } from './todo.js';
import { Storage } from './storage.js';

const storage = new Storage();
const todo = new Todo(storage);
