function save() {
    let fullname = document.getElementById('fullname').value;
    let gender = '';
    let birthday = document.getElementById('birthday').value;
    if(document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    }else if (document.getElementById('famale').checked) {
        gender = document.getElementById('famale').value;
    }

    if(_.isEmpty(fullname)){
        document.getElementById('fullname-error').innerHTML= 'Vui lòng nhập họ và tên!'
    }else {
        document.getElementById('fullname-error').innerHTML= ''
    }

    if(_.isEmpty(birthday)){
        document.getElementById('birthday-error').innerHTML= 'Vui lòng nhập đầy đủ ngày sinh!'
    }else {
        document.getElementById('birthday-error').innerHTML= ''
    }

    if (_.isEmpty(gender)){
        document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính'
    }

    if (fullname && gender && birthday){
        // document.getElementById('list-user').style.display = 'none';
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];

        
        if(edit===1){
            user[idd].fullname = document.getElementById('fullname').value;
            if(document.getElementById('male').checked) {
                user[idd].gender = document.getElementById('male').value;
            }else if (document.getElementById('famale').checked) {
                user[idd].gender = document.getElementById('famale').value;
            }
            user[idd].birthday = document.getElementById('birthday').value;

            alert('Sửa thông tin thành công!')
            edit = 0;
        }else
        {
            user.push({
                fullname : fullname,
                gender : gender,
                birthday : birthday
            });
        }
        
        localStorage.setItem('user', JSON.stringify(user));

        this.renderListUser();
        document.getElementById('fullname').value = '';
        document.getElementById('male').checked = false;
        document.getElementById('famale').checked = false;
        document.getElementById('birthday').value = 'yyyy-MM-dd';

        
    }
}
function renderListUser(){
    edit = 0;
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
    
    let tableContent = `<tr style = "font-weight: bold; text-align: center;">
        <td>ID</td>
        <td>Họ và tên</td>
        <td>Giới tính</td>
        <td>Ngày sinh</td>
        <td>Hành động</td>
    </tr>`;

    user.forEach((user, index) => {
        let userId = index;
        index++;
        let genderLabel = parseInt(user.gender) ===1 ? 'Nam' : 'Nữ';
        tableContent += `<tr  style="text-align: center;">
            <td>${index}</td>
            <td>${user.fullname}</td>
            <td>${genderLabel}</td>
            <td>${user.birthday}</td>
            <td>
                <a href="#" onclick="editUser(${userId})"><i class="fas fa-edit"></i></a> | <a href="#" onclick="deleteUser(${userId})"><i class="fa fa-trash" aria-hidden="true"></i> </a>
            </td>
        </tr>`;
    })

    document.getElementById('grid-user').innerHTML = tableContent;
}

function deleteUser(id){
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
    user.splice(id,1);
    alert('Xóa người dùng thành công');

    localStorage.setItem('user', JSON.stringify(user));
    renderListUser();
}

function editUser(id){
    edit = 1;
    idd = id;
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];

    document.getElementById('fullname').value = user[id].fullname;

    if(parseInt(user[id].gender) === 1){
        document.getElementById('male').checked = true;
    }else {
        document.getElementById('famale').checked = true;
    }
    
    document.getElementById('birthday').value = user[id].birthday;
}

