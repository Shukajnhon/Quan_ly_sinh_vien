var DanhSachSinhVien = new danhSachSinhVien();
var validation = new ValidationForm();

// bổ sung thuộc tính
sinhVien.prototype.DiemToan = '';
sinhVien.prototype.DiemHoa = '';
sinhVien.prototype.DiemLy = '';
sinhVien.prototype.DiemTB = '';
sinhVien.prototype.xepLoaiHocLuc = '';

// bổ sung phương thức
sinhVien.prototype.tinhDTB = function () {
    this.DiemTB = ((Number(this.DiemToan) + Number(this.DiemHoa) + Number(this.DiemLy)) / 3).toFixed(2);
}

sinhVien.prototype.xepLoai = function () {
    if (this.DiemTB <= 10 && this.DiemTB >= 8) {
        this.xepLoaiHocLuc = 'Giỏi'
    } else if (this.DiemTB < 8 && this.DiemTB >= 6.5) {
        this.xepLoaiHocLuc = 'Khá'
    } else if (this.DiemTB < 6.5 && this.DiemTB >= 5) {
        this.xepLoaiHocLuc = 'Trung Bình'
    } else if (this.DiemTB < 5) {
        this.xepLoaiHocLuc = 'Yếu'
    }
}

// gọi localStorage mỗi khi load
getStorage()

function DomID(id) {
    var element = document.getElementById(id);
    return element
}
// lấy dũ liệu từ input form
function getValueFromInput(selector) {
    var inputElement = document.getElementById(selector)
    return inputElement.value
}
// set value to input by selector
function setInputValue(selector, value) {
    var element = document.getElementById(selector)
    return element.value = value
}

function themSinhVien() {

    // lấy dữ liệu người dùng nhập vào


    // cách 1:
    // var masv = DomID("masv").value;
    // var hoten = DomID("hoten").value;
    // var cmnd = DomID("cmnd").value;
    // var sodt = DomID("sodt").value;
    // var email = DomID("email").value;

    // cách 2:
    let masv = getValueFromInput("masv")
    let hoten = getValueFromInput("hoten")
    let cmnd = getValueFromInput("cmnd")
    let sodt = getValueFromInput("sodt")
    let email = getValueFromInput("email")

    let loi = 0;

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

    // nếu các diều kiện trên lỗi, dừng chương trình, ko push vào DSSV
    if (loi != 0) {
        return;
    }

    // check user nhập MaSv trùng. nếu trùng dừng  chương trình, ko push vào DSSV
    if (checkMaSV(masv)) {
        return;
    }



    // push Sinh vien vao Danh SAch SV
    var sinhvien = new sinhVien(masv, hoten, cmnd, sodt, email);

    sinhvien.DiemToan = DomID("toan").value;
    sinhvien.DiemLy = DomID("ly").value;
    sinhvien.DiemHoa = DomID("hoa").value;
    sinhvien.tinhDTB();
    sinhvien.xepLoai();

    // Kiểm tra nếu 1 trong những validation bằng Rỗng ko push vào mảng DSSV
    if (!(masv, hoten, cmnd, sodt, email === '')) {
        DanhSachSinhVien.themSinhVien(sinhvien);
    }


    // Cập nhật và render danh sách sinh viên
    capNhatDanhSachSinhVien(DanhSachSinhVien)
    console.log(sinhvien);


    // clear value from Input form after click add Sinh Vien Button
    setInputValue("masv", "")
    setInputValue("hoten", "")
    setInputValue("cmnd", "")
    setInputValue("sodt", "")
    setInputValue("email", "")


}


// check MaSV (hoặc mã ID)
function checkMaSV(masv) {
    if (localStorage.getItem('DanhSachSV')) {

        let MaSv_list = DanhSachSinhVien.DSSV;

        for (var i = 0; i < MaSv_list.length; i++) {

            if (MaSv_list[i].MaSv === masv) {
                alert('Mã sinh viên đã tồn tại')
                return true;
            }
            capNhatDanhSachSinhVien(DanhSachSinhVien)
        }
    }

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
        trSinhVien.setAttribute('id', sv.MaSv)
        trSinhVien.setAttribute('onclick', 'editSinhVien("' + sv.MaSv + '")')

        // tạo thẻ td và các filter dữ liệu sinh viên 
        var tdCheckBox = document.createElement('td')
        // tạo checkbox để click chọn 1 hoặc nhiều đối tường cần xóa sau này
        var checkBoxMaSV = document.createElement('input')
        // console.log(checkBoxMaSV);
        checkBoxMaSV.setAttribute('class', 'checkBoxMaSV')
        checkBoxMaSV.setAttribute('type', 'checkbox')
        checkBoxMaSV.setAttribute('value', sv.MaSv);
        // Thêm checkBoxMaSV attribute vào TdCheckBox
        tdCheckBox.appendChild(checkBoxMaSV)

        var tdMaSV = taoTheTD('masv', sv.MaSv);
        var tdHoTen = taoTheTD('hoten', sv.HoTen);
        var tdCMND = taoTheTD('cmnd', sv.Cmnd);
        var tdSoDT = taoTheTD('sodt', sv.Sodt);
        var tdEmail = taoTheTD('email', sv.Email);

        // tạo thẻ td Điểm trung bình và xếp loại
        var tdDTB = taoTheTD('DTB', sv.DiemTB)
        var tdXepLoai = taoTheTD('XepLoai', sv.xepLoaiHocLuc)

        // append các td vào tr
        trSinhVien.appendChild(tdCheckBox);
        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdCMND);
        trSinhVien.appendChild(tdSoDT);
        trSinhVien.appendChild(tdEmail);
        trSinhVien.appendChild(tdDTB);
        trSinhVien.appendChild(tdXepLoai);

        // append các tr vào tbodySinhVien
        listTableSV.appendChild(trSinhVien);
    }
}

// edit (chỉnh sửa) sinh viên
function editSinhVien(masv) {

    let sinhvien = DanhSachSinhVien.timSVTheoMa(masv)

    if (sinhvien != null) {
        DomID('masv').value = sinhvien.MaSv
        DomID('hoten').value = sinhvien.HoTen
        DomID('cmnd').value = sinhvien.Cmnd
        DomID('sodt').value = sinhvien.Sodt
        DomID('email').value = sinhvien.Email
    }

}

function luuThongTin() {
    let masv = getValueFromInput("masv")
    let hoten = getValueFromInput("hoten")
    let cmnd = getValueFromInput("cmnd")
    let sodt = getValueFromInput("sodt")
    let email = getValueFromInput("email")


    let loi = 0;

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

    // nếu các diều kiện trên lỗi, dừng chương trình, ko push vào DSSV
    if (loi != 0) {
        return;
    }
    // push Sinh vien vao Danh SAch SV
    var sinhvien = new sinhVien(masv, hoten, cmnd, sodt, email);

    sinhvien.DiemToan = DomID("toan").value;
    sinhvien.DiemLy = DomID("ly").value;
    sinhvien.DiemHoa = DomID("hoa").value;
    sinhvien.tinhDTB();
    sinhvien.xepLoai();

    // Kiểm tra nếu 1 trong những validation bằng Rỗng ko push vào mảng DSSV
    if (!(masv, hoten, cmnd, sodt, email === '')) {
        DanhSachSinhVien.suaSinhVien(sinhvien);
    }


    // Cập nhật và render danh sách sinh viên
    capNhatDanhSachSinhVien(DanhSachSinhVien)
}

// tìm kiếm sinh viên 
function search() {
    var TuKhoa = getValueFromInput('tukhoa');
    var lstDSSVTimKiem = DanhSachSinhVien.timKiemSinhVien(TuKhoa)
    capNhatDanhSachSinhVien(lstDSSVTimKiem)
}
search()

// xóa sinh viên
function deleteSinhVien() {
    //mảng checkbox
    var lstMaSV = document.querySelectorAll('.checkBoxMaSV')

    // mảng sinh viên đc chọn
    var lstMaSVDuocChon = [];


    if (confirm('bạn có chắc muốn xóa?')) {
        for (var i = 0; i < lstMaSV.length; i++) {
            // kiểm tra phần checkbox đc chọn hay chưa
            if (lstMaSV[i].checked) {
                // phần tử đc chọn thì push vào lstMaSVDuocChon
                lstMaSVDuocChon.push(lstMaSV[i].value);
                console.log(lstMaSVDuocChon);
            }
        }

        DanhSachSinhVien.xoaSinhVien(lstMaSVDuocChon)
    }
    capNhatDanhSachSinhVien(DanhSachSinhVien)
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
