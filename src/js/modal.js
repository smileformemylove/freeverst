import {editModalData} from './constants.js';

const options = {backdrop: 'static', focus: true, keyboard: false};

const editModal = new bootstrap.Modal(editModalData.selector, options);

export default editModal;
