var DanhSachSinhVien = new danhSachSinhVien();
var validation = new ValidationForm();


function DomID(id) {
    var element = document.getElementById(id);
    return element
}
function themSinhVien() {

    // lấy dữ liệu người dùng nhập vào
    var masv = DomID("masv").value;
    var hoten = DomID("hoten").value;
    var cmnd = DomID("cmnd").value;
    var sodt = DomID("sodt").value;
    var email = DomID("email").value;

    var loi = 0;

    //kiem tra validate ma sinh vien
    if (kiemTraDauVaoRong("masv", masv) === true) {
        changeDisplayStyleBlock("studentCodeError");
        loi++;
    } else {
        changeDisplayStyleNone("studentCodeError")
    }

    //kiem tra validate ho ten sinh vien
    if (kiemTraDauVaoRong("hoten", hoten) === true) {
        changeDisplayStyleBlock("fullNameError");
        loi++;
    } else {
        changeDisplayStyleNone("fullNameError")
    }

    //kiem tra validate CMND sinh vien
    if (kiemTraDauVaoRong("cmnd", cmnd) === true) {
        changeDisplayStyleBlock("cmndError");
        loi++;
    } else {
        changeDisplayStyleNone("cmndError")
    }

    //kiem tra validate so dien thoai sinh vien

    if (validation.KiemTraSoDT(sodt)) {
        changeDisplayStyleNone("sodtError")
        DomID("sodt").style.borderColor = '';
    } else {
        DomID("sodt").style.borderColor = 'red';
        changeDisplayStyleBlock("sodtError");
        loi++;
    }


    //kiem tra validate email sinh vien
    if (validation.KiemTraEmail(email)) {
        changeDisplayStyleNone("emailError")
        DomID("email").style.borderColor = '';
    } else {
        DomID("email").style.borderColor = 'red';
        changeDisplayStyleBlock("emailError")
        loi++;
    }

    if (loi != 0) {
        return;
    }

    // push Sinh vien vao Danh SAch SV
    var sinhvien = new sinhVien(masv, hoten, cmnd, sodt, email);

    // Kiểm tra nếu 1 trong những validation bằng Rỗng ko push vào mảng DSSV
    if (!(masv, hoten, cmnd, sodt, email === '')) {
        DanhSachSinhVien.themSinhVien(sinhvien);
    }


    // Cập nhật và render danh sách sinh viên
    capNhatDanhSachSinhVien(DanhSachSinhVien)


    console.log(DanhSachSinhVien);
}



// cập nhật danh sách sinh vien 
function capNhatDanhSachSinhVien(DanhSachSinhVien) {
    var listTableSV = DomID("tbodySinhVien");
    listTableSV.innerHTML = '';

    for (var i = 0; i < DanhSachSinhVien.DSSV.length; i++) {
        // lấy thông tin sv từ mảng sinh viên 
        var sv = DanhSachSinhVien.DSSV[i];

        // tạo thẻ tr
        var trSinhVien = document.createElement('tr');

        // tạo thẻ td và các filter dữ liệu sinh viên 
        var tdCheckBox = document.createElement('td')
        var tdMaSV = taoTheTD('masv', sv.MaSv);
        var tdHoTen = taoTheTD('hoten', sv.HoTen);
        var tdCMND = taoTheTD('cmnd', sv.Cmnd);
        var tdSoDT = taoTheTD('sodt', sv.Sodt);
        var tdEmail = taoTheTD('email', sv.Email);

        // append các td vào tr
        trSinhVien.appendChild(tdCheckBox);
        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdCMND);
        trSinhVien.appendChild(tdSoDT);
        trSinhVien.appendChild(tdEmail);

        // append các tr vào tbodySinhVien
        listTableSV.appendChild(trSinhVien);
    }
}

// Tạo thẻ Table data 
function taoTheTD(className, value) {
    var td = document.createElement('td');
    td.className = className;
    td.innerHTML = value;
    return td;
}


// kiem tra dau vao co rong hay khong
function kiemTraDauVaoRong(id, value) {

    if (validation.KiemTraRong(value) == true) {
        DomID(id).style.borderColor = 'red';
        // DomID(id).style.display = 'block';
        return true;
    } else {
        DomID(id).style.borderColor = '';
        // DomID(id).style.display = 'none';
        return false;
    }
}


// changeDisplayStyleBlock
function changeDisplayStyleBlock(id) {
    var element = document.getElementById(id);
    return element.style.display = 'block';
}

// changeDisplayStyleNone
function changeDisplayStyleNone(id) {
    var element = document.getElementById(id);
    return element.style.display = 'none';
}

// Lưu vào Local Storage
function setStorage() {

    // chuyển đổi Object mảng DSSV thành chuỗi JSON
    var jsonDanhSachSinhVien = JSON.stringify(DanhSachSinhVien.DSSV);

    // rồi đem chuổi JSON lưu vào Storage và đặt tên là DanhSachSV
    localStorage.setItem('DanhSachSV', jsonDanhSachSinhVien);
}

// lấy data từ LocalStorage
function getStorage() {
    // lấy ra chuỗi JSON là mảng DanhSachSinhVien thông qua tên DanhSachSV
    var jsonDanhSachSinhVien = localStorage.getItem('DanhSachSV');
    var mangDSSV = JSON.parse(jsonDanhSachSinhVien);
    DanhSachSinhVien.DSSV = mangDSSV;

    capNhatDanhSachSinhVien(DanhSachSinhVien)
}

