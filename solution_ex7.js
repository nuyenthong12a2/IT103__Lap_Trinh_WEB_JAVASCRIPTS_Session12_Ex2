// RikkeiStream - Ung dung Console Menu quan ly thue bao SaaS
// Cai dat thu vien nhap lieu truoc khi chay:  npm install prompt-sync
const prompt = require('prompt-sync')({ sigint: true });

// ===== DU LIEU KHOI TAO =====
const subscriptions = [
  { subscriptionId: 'SUB_001', customerName: 'Nguyen Van An', planTier: 'FAMILY', deviceLimit: 5 },
  { subscriptionId: 'SUB_002', customerName: 'Tran Thi Mai', planTier: 'PERSONAL', deviceLimit: 1 },
  { subscriptionId: 'SUB_003', customerName: 'Le Hoang Nam', planTier: 'PERSONAL', deviceLimit: 1 }
];

// Bien dem de sinh ma tu dong, khong bi trung ma sau khi xoa
let nextIdNumber = subscriptions.length + 1;

// ===== HAM TIEN ICH =====
function getDeviceLimit(planTier) {
  if (planTier === 'FAMILY') {
    return 5;
  }
  return 1; // PERSONAL
}

function generateId() {
  let numberText = String(nextIdNumber);
  while (numberText.length < 3) {
    numberText = '0' + numberText;
  }
  nextIdNumber++;
  return 'SUB_' + numberText;
}

function findIndexById(subscriptionId) {
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].subscriptionId === subscriptionId) {
      return i;
    }
  }
  return -1;
}

// Nhap goi cuoc: tra ve 'PERSONAL' / 'FAMILY' hoac '' neu lua chon khong hop le
function inputPlanTier() {
  console.log('  1. PERSONAL (1 thiet bi)');
  console.log('  2. FAMILY   (5 thiet bi)');
  const planChoice = prompt('Chon goi cuoc (1-2): ').trim();
  if (planChoice === '1') {
    return 'PERSONAL';
  }
  if (planChoice === '2') {
    return 'FAMILY';
  }
  return '';
}

function displayMenu() {
  console.log('\n==============================================');
  console.log('      RIKKEISTREAM - QUAN TRI THUE BAO');
  console.log('==============================================');
  console.log('1. Them thue bao moi');
  console.log('2. Xem toan bo danh sach thue bao');
  console.log('3. Cap nhat goi cuoc');
  console.log('4. Huy thue bao');
  console.log('5. Thoat chuong trinh');
  console.log('----------------------------------------------');
}

// ===== CAC HAM CRUD =====
function addSubscription() {
  console.log('\n--- THEM THUE BAO MOI ---');
  const customerName = prompt('Nhap ten khach hang: ').trim();
  if (customerName === '') {
    console.log('Loi: Ten khach hang khong duoc de trong!');
    return;
  }

  const planTier = inputPlanTier();
  if (planTier === '') {
    console.log('Loi: Goi cuoc khong hop le!');
    return;
  }

  const newSub = {
    subscriptionId: generateId(),
    customerName: customerName,
    planTier: planTier,
    deviceLimit: getDeviceLimit(planTier)
  };
  subscriptions.push(newSub);
  console.log('Them thanh cong thue bao ' + newSub.subscriptionId + '!');
}

function listSubscriptions() {
  console.log('\n--- DANH SACH THUE BAO ---');
  if (subscriptions.length === 0) {
    console.log('Danh sach trong.');
    return;
  }

  const line = '+----------+----------------------+------------+--------------+';
  console.log(line);
  console.log(
    '| ' + 'Ma'.padEnd(8) +
    ' | ' + 'Ten khach hang'.padEnd(20) +
    ' | ' + 'Goi cuoc'.padEnd(10) +
    ' | ' + 'So thiet bi'.padEnd(12) + ' |'
  );
  console.log(line);
  for (let i = 0; i < subscriptions.length; i++) {
    const sub = subscriptions[i];
    console.log(
      '| ' + sub.subscriptionId.padEnd(8) +
      ' | ' + sub.customerName.padEnd(20) +
      ' | ' + sub.planTier.padEnd(10) +
      ' | ' + String(sub.deviceLimit).padEnd(12) + ' |'
    );
  }
  console.log(line);
  console.log('Tong so thue bao: ' + subscriptions.length);
}

function updateSubscription() {
  console.log('\n--- CAP NHAT GOI CUOC ---');
  const subscriptionId = prompt('Nhap ma thue bao (VD: SUB_001): ').trim().toUpperCase();
  const index = findIndexById(subscriptionId);
  if (index === -1) {
    console.log('Loi: Khong tim thay thue bao ' + subscriptionId + '!');
    return;
  }

  const sub = subscriptions[index];
  console.log('Goi hien tai cua ' + sub.customerName + ': ' + sub.planTier);

  const newPlan = inputPlanTier();
  if (newPlan === '') {
    console.log('Loi: Goi cuoc khong hop le!');
    return;
  }
  if (newPlan === sub.planTier) {
    console.log('Thue bao dang su dung goi nay, khong co thay doi.');
    return;
  }

  sub.planTier = newPlan;
  sub.deviceLimit = getDeviceLimit(newPlan);
  console.log('Cap nhat thanh cong: ' + sub.subscriptionId + ' -> ' + sub.planTier +
    ' (' + sub.deviceLimit + ' thiet bi).');
}

function deleteSubscription() {
  console.log('\n--- HUY THUE BAO ---');
  const subscriptionId = prompt('Nhap ma thue bao can huy: ').trim().toUpperCase();
  const index = findIndexById(subscriptionId);
  if (index === -1) {
    console.log('Loi: Khong tim thay thue bao ' + subscriptionId + '!');
    return;
  }

  const confirmDelete = prompt('Xac nhan huy thue bao cua ' +
    subscriptions[index].customerName + '? (y/n): ').trim().toLowerCase();
  if (confirmDelete === 'y') {
    subscriptions.splice(index, 1);
    console.log('Da huy thue bao ' + subscriptionId + '.');
  } else {
    console.log('Da huy thao tac xoa.');
  }
}

// ===== CHUONG TRINH CHINH =====
function main() {
  let menuChoice;
  do {
    displayMenu();
    menuChoice = prompt('Nhap lua chon (1-5): ').trim();

    switch (menuChoice) {
      case '1':
        addSubscription();
        break;
      case '2':
        listSubscriptions();
        break;
      case '3':
        updateSubscription();
        break;
      case '4':
        deleteSubscription();
        break;
      case '5':
        console.log('Tam biet! Da thoat chuong trinh RikkeiStream.');
        break;
      default:
        console.log('Lua chon khong hop le, vui long nhap tu 1 den 5!');
    }
  } while (menuChoice !== '5');
}

main();