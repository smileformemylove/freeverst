import {removeBtn, todoItemContainer, editBtn} from "./constants.js";

export const createTodoItem = ({title, description, id}) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'col-4';
    wrapper.setAttribute(todoItemContainer.attr, id)

    wrapper.innerHTML = `
            <div class="taskWrapper">
                <div class="taskHeading">#${id} | ${title}</div>
                <div class="taskDescription">${description}</div>
                <hr>
                <div class="btn-container" style="display: flex; gap: 10px;">
                      <button type="button" class="btn btn-danger" ${removeBtn.attr}><i class="bi bi-trash3-fill"></i></button>
                      <button type="button" class="btn btn-primary" ${editBtn.attr}><i class="bi bi-pencil-fill"></i></button>
                </div>
            </div>`;

    return wrapper;
}
