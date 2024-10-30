'use strict';
import getFormHandlers from "./formHandlers.js";
import { createTodoItem } from "./elements.js";
import {storageKey, editModalData, todoItemContainer} from "./constants.js";
import {saveData, updateById} from "./dataHandling.js";
import {removeItemHandler, editItemHandler} from "./controlsHandlers.js";
import editModal from './modal.js'


(function () {
    const form = document.querySelector('[data-todo-form]');
    const todoItemsContainer = document.querySelector('#todoItems');

    const handleFormData = ({data, event}) => {
        event.target.reset();
        const savedData = saveData(data)
        const todoItemElement = createTodoItem(savedData);
        todoItemsContainer.prepend(todoItemElement);
    }

    const {submitHandler, inputHandler} = getFormHandlers(form, handleFormData);
    form.addEventListener('submit', submitHandler);
    form.addEventListener('input', inputHandler);


    const editForm = document.querySelector(editModalData.formSelector);
    const handleEditForm = ({data}) => {
        updateById({...data, id : Number(data.id)});
        const newTemplate = createTodoItem(data);
        const oldTemplate = document.querySelector(`[${todoItemContainer.attr} = "${data.id}"]`);
        oldTemplate.replaceWith(newTemplate);
        editModal.hide();
    }

    const {submitHandler: editSubmitHandler, inputHandler: editInputHandler} = getFormHandlers(editForm, handleEditForm);

    editForm.addEventListener('click', (e) => {
        if (e.target.nodeName !== 'BUTTON' || e.target?.type !== 'reset' ) return;

        e.target.closest('form').reset();
        editModal.hide();


    })


    editForm.addEventListener('submit', editSubmitHandler);
    editForm.addEventListener('input', editInputHandler);



    todoItemsContainer.addEventListener('click', removeItemHandler);
    todoItemsContainer.addEventListener('click', editItemHandler);

    document.addEventListener('DOMContentLoaded', () => {
        const savedData = JSON.parse(localStorage.getItem(storageKey));
        if(!savedData) return;

        savedData.forEach((todoItem) => {
            const todoItemElement = createTodoItem(todoItem);
            todoItemsContainer.prepend(todoItemElement);
        })
    })
})();



