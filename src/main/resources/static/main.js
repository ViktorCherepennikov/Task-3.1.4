$(async function () {
    await getTableWithUsers();
    getNewUserForm();
    getDefaultModal();
    addNewUser();
})
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
    findAllUsers: async () => await fetch('api/admin'),
    findOneUser: async (id) => await fetch(`api/admin/${id}`),
    addNewUser: async (user) => await fetch('api/admin', {method: 'POST', headers: userFetchService.head, body: JSON.stringify(user)}),
    updateUser: async (user, id) => await fetch(`api/admin/${id}`, {method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch(`api/admin/${id}`, {method: 'DELETE', headers: userFetchService.head})
}
//All users
async function getTableWithUsers() {fetch(url)
    .then(res => res.json())
    .then(users => {
        users.forEach(user => {
            output +=`<tr>
                                        <td >${user.id}</td>
                                        <td >${user.firstName}</td>
                                        <td >${user.lastName}</td>
                                        <td >${user.password}</td>
                                        <td >${user.age}</td>
                                        <td >${user.username}</td>
                                        <td >${user.roleOnly}</td>
                                        <td>
                                <button type="button" name = "editBtn" data-userid="${user.id}" data-action="edit" class="btn btn-primary"
                                data-toggle="modal"  data-target="#someDefaultModal">Edit</button>
                            </td>
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger"
                                data-toggle="modal" data-target="#someDefaultModal">Delete</button>
                            </td>

                                        </tr>

                `;
        });
        tableAdmin.innerHTML=output

    })

    document.querySelector('.users').find('button').on('click', (event) => {
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
    let button = document.getElementById('nav-profile-tab');
    let form = document.getElementById('newUser')
    button.on('click', () => {
        if (form.attr("data-hidden") === "true") {
            form.attr('data-hidden', 'false');
            form.show();
            button.text('Hide panel');
        } else {
            form.attr('data-hidden', 'true');
            form.hide();
            button.text('Show panel');
        }
    })
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
    let preUser = await userFetchService.findOneUser(id);
    let user = preUser.json();

    modal.find('.modal-title').html('Edit user');

}
async function deleteUser(modal, id) {
    let preUser = await userFetchService.findOneUser(id);
    let user = preUser.json();

    modal.find('.modal-title').html('Delete user');
}

$('#modalEdit').on('show.bs.modal', function (event) {
    let user = $(event.relatedTarget);
    $("#modalEdit #editId").val(user.data('id'));
    $("#modalEdit #editUsername").val(user.data('username'));
    $("#modalEdit #editFirstName").val(user.data('firstname'));
    $("#modalEdit #editLastName").val(user.data('lastname'));
    $("#modalEdit #editAge").val(user.data('age'));
    $("#modalEdit #editPassword").val(user.data('password'));
    $("#modalEdit #editRolesSelector").val(user.data('roles'));
});
$('#modalDelete').on('show.bs.modal', function (event) {
    let user = $(event.relatedTarget);
    $("#modalDelete #deleteId").val(user.data('id'));
    $("#modalDelete #deleteUsername").val(user.data('username'));
    $("#modalDelete #deleteFirstName").val(user.data('firstname'));
    $("#modalDelete #deleteLastName").val(user.data('lastname'));
    $("#modalDelete #deleteAge").val(user.data('age'));
    $("#modalDelete #deletePassword").val(user.data('password'));
    $("#modalDelete #deleteRolesSelector").val(user.data('roles'));
});
<tr>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.password}</td>
    <td>${user.age}</td>
    <td>${user.username}</td>
    <td>${user.roleOnly}</td>
    <td>
        <button type="button" name="editBtn" data-userid="${user.id}" data-action="edit" className="btn btn-primary"
                data-toggle="modal" data-target="#someDefaultModal">Edit
        </button>
    </td>
    <td>
        <button type="button" data-userid="${user.id}" data-action="delete" className="btn btn-danger"
                data-toggle="modal" data-target="#someDefaultModal">Delete
        </button>
    </td>

</tr>