import {editBtn, removeBtn, todoItemContainer, editModalData} from "./constants.js";
import {removeData, getItemById} from "./dataHandling.js";
import editModal from "./modal.js"


const validateTarget = (target, selector) => {
    if(!target.closest(selector)) return true;
    return false;
}

const findWrapperContainer = (target) => {
    const element = target.closest(todoItemContainer.selector);
    const id = Number(element.getAttribute(todoItemContainer.attr));

    return {
        element,
        id
    }
}

export const removeItemHandler = ({target}) => {
    if(validateTarget(target, removeBtn.selector)) return;
    const {element: wrapperElement, id: todoItemId} =  findWrapperContainer(target);

    removeData(todoItemId);
    wrapperElement.remove()
}

export const editItemHandler = ({target}) => {
    if(validateTarget(target, editBtn.selector)) return;
    const {element: wrapperElement, id: todoItemId} =  findWrapperContainer(target);
    const toDoItemData = getItemById(todoItemId);
    const title = editModal._element.querySelector(editModalData.titleSelector);
    const form = editModal._element.querySelector(editModalData.formSelector);
    const inputs = form.querySelectorAll('input, textarea');

    title.innerHTML = 'Editing todo item #' + toDoItemData.id;

    Object.keys(toDoItemData).forEach(key => {
        inputs.forEach(input => {
            if(input.name === key) input.value = toDoItemData[key];
        })
    })

    editModal.show();
}
