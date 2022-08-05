$(async function () {
    await getTableWithUsers();
    getNewUserForm();
    getDefaultModal();
    addNewUser();
})
const output1 = 'console output'
const tableAdmin= document.querySelector('.users')
const addUser = document.querySelector('.newUser')
const url = '/api/admin'
let output = ''
const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch(url),
    findOneUser: async (id) => await fetch(url+`/${id}`),
    addNewUser: async (user) => await fetch(url, {method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)}),
    updateUser: async (user) => await fetch(url, {method: 'PATCH', headers: userFetchService.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch(url+`/${id}`, {method: 'DELETE', headers: userFetchService.head})
}
//All users
async function getTableWithUsers() {
    let table = $('#mainTableWithUsers tbody');
    table.empty();

    await userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let tableFilling = `$(
<tr>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.password}</td>
    <td>${user.age}</td>
    <td>${user.username}</td>
    <td>${user.roleOnly}</td>
    <td>
        <button type="button" name="editBtn" data-userid="${user.id}" data-action="edit" class="btn btn-primary"
                data-toggle="modal" data-target="#someDefaultModal">Edit
        </button>
    </td>
    <td>
        <button type="button" name="deleteBtn" data-userid="${user.id}" data-action="delete" class="btn btn-danger"
                data-toggle="modal" data-target="#someDefaultModal">Delete
        </button>
    </td>

</tr>
                )`;
                table.append(tableFilling);
            })
        })

    $("#mainTableWithUsers").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');
        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');
        defaultModal.attr('data-userid',buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}
async function getNewUserForm() {
    let form = $(`#defaultSomeForm`);
    form.attr('data-hidden', 'false');
    form.show();
}
async function getDefaultModal() {
    $('#someDefaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", (event) => {
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        console.log(userid);
        console.log(action);
        switch (action) {
            case 'edit':
                editUser(thisModal, userid);
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}
async function editUser(modal, id) {
    let preuser = await userFetchService.findOneUser(id);
    let user = preuser.json();

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-outline-success" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group" id="editUser">
            <label class="text-center font-weight-bold" for="editId">Id</label>
                <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled><br>
                <label class="text-center font-weight-bold" for="editFirstName">First name</label>
                <input class="form-control" type="text" id="firstName" value="${user.firstName}"><br>
                <label class="text-center font-weight-bold" for="editLastName">Last name</label>
                <input class="form-control" type="text" id="lastName" value="${user.lastName}"><br>
                <label class="text-center font-weight-bold" for="editPassword">Password</label>
                <input class="form-control" type="password" id="password" value="${user.password}"><br>
                <label class="text-center font-weight-bold" for="editAge">Age</label>
                <input class="form-control" id="age" type="number" value="${user.age}"><br>
                <label class="text-center font-weight-bold" for="editUsername">Email</label>
                <input class="form-control" type="text" id="username" value="${user.username}"><br>
                <label class="text-center font-weight-bold" for="editRolesSelector">Role</label>
                <select class="custom-select" size="2"  id="editRolesSelector" value="${user.roles}" multiple required >
                                            <option id="roleAdmin" value="ROLE_ADMIN" requared>ADMIN</option>                        
                                            <option id="roleUser" value="ROLE_USER" requared>USER</option>
                                        </select>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let id = modal.find("#id").val().trim();
        let firstName = modal.find("#firstName").val().trim();
        let lastName = modal.find("#lastName").val().trim();
        let password = modal.find("#password").val().trim();
        let age = modal.find("#age").val().trim();
        let username = modal.find("#username").val().trim();
        let roleAdmin = modal.find("#roleAdmin").val().trim();
        let roleUser = modal.find("#roleUser").val().trim();
        let role;
        if(modal.find('#roleUser').prop('selected') ===true && modal.find('#roleUser').prop('selected') ===true ){
            role = [{"id": 1,
                "name" : roleAdmin}
                ,{"id": 2,
                "name" : roleUser}]
        }
        if(modal.find('#roleAdmin').prop('selected') ===true && modal.find('#roleUser').prop('selected') ===false ){
            role = [{"id": 1,
                "name" : roleAdmin}]
        }
        if(modal.find('#roleUser').prop('selected') ===true && modal.find('#roleAdmin').prop('selected') ===false){
            role = [{"id": 2,
                "name" : roleUser}]
        }

        let data = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            password: password,
            age: age,
            username: username,
            roles: role
        };

        const response = await userFetchService.updateUser(data);

        if (response.ok) {
            getTableWithUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}
async function deleteUser(modal, id) {
    let preuser = await userFetchService.findOneUser(id)
    let user = preuser.json();

    modal.find('.modal-title').html('Delete User');

    let deleteButton = `<button  class="btn btn-danger" id="deleteButton">Delete</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group" id="deleteUser">
            <label class="text-center font-weight-bold" for="deleteId">Id</label>
                <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled><br>
                <label class="text-center font-weight-bold" for="deleteFirstName">First name</label>
                <input class="form-control" type="text" id="firstName" value="${user.firstName}" disabled><br>
                <label class="text-center font-weight-bold" for="deleteLastName">Last name</label>
                <input class="form-control" type="text" id="lastName" value="${user.lastName}" disabled><br>
                <label class="text-center font-weight-bold" for="deletePassword">Password</label>
                <input class="form-control" type="password" id="password" value="${user.password}" disabled><br>
                <label class="text-center font-weight-bold" for="deleteAge">Age</label>
                <input class="form-control" id="age" type="number" value="${user.age}" disabled><br>
                <label class="text-center font-weight-bold" for="deleteUsername">Email</label>
                <input class="form-control" type="text" id="username" value="${user.username}" disabled><br>
                <label class="text-center font-weight-bold" for="deleteRolesSelector">Role</label>
                <select class="custom-select" size="2"  id="deleteRolesSelector" value="${user.roles}" multiple required  disabled >
                                            <option id="roleAdmin" value="ROLE_ADMIN"  disabled>ADMIN</option>                        
                                            <option id="roleUser" value="ROLE_USER"  disabled>USER</option>
                                        </select>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })
    $("#deleteButton").on('click', async () =>{
        const response = await userFetchService.deleteUser(id);

        if (response.ok) {
            getTableWithUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })

}
async function addNewUser() {
    $('#addNewUserButton').click(async () =>  {
        let addUserForm = $('#defaultSomeForm')
        let firstName = addUserForm.find("#editFirstName").val().trim();
        let lastName = addUserForm.find("#editLastName").val().trim();
        let password = addUserForm.find("#editPassword").val().trim();
        let age = addUserForm.find("#editAge").val().trim();
        let username = addUserForm.find("#editUsername").val().trim();
        let roleAdmin = addUserForm.find("#roleAdmin").val().trim();
        let roleUser = addUserForm.find("#roleUser").val().trim();
        let role;
        if(addUserForm.find('#roleUser').prop('selected') ===true && addUserForm.find('#roleUser').prop('selected') ===true ){
            role = [{"id": 1,
                "name" : roleAdmin}
                ,{"id": 2,
                    "name" : roleUser}]
        }
        if(addUserForm.find('#roleAdmin').prop('selected') ===true && addUserForm.find('#roleUser').prop('selected') ===false ){
            role = [{"id": 1,
                "name" : "ROLE_ADMIN"}]
        }
        if(addUserForm.find('#roleUser').prop('selected') ===true && addUserForm.find('#roleAdmin').prop('selected') ===false){
            role = [{"id": 2,
                "name" : roleUser}]
        }

        let data = {
            username: username,
            age: age,
            password: password,
            firstName: firstName,
            lastName: lastName,
            roles: role
        };
        const response = await userFetchService.addNewUser(data);
        if (response.ok) {
            getTableWithUsers();
            addUserForm.find("#editLastName").val('')
            addUserForm.find("#editPassword").val('')
            addUserForm.find("#editAge").val('')
            addUserForm.find("#editUsername").val('')
            addUserForm.find("#roleAdmin").val('')
            addUserForm.find("#roleUser").val('')
        }
        else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert)
        }
    })
}