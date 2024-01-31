import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
const firebaseConfig = {
	apiKey: "AIzaSyBVzogtV3pixZ0ChRdUjUo0ma-jTpbEVlU",
	authDomain: "myproject-b87f8.firebaseapp.com",
	databaseURL: "https://myproject-b87f8-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "myproject-b87f8",
	storageBucket: "myproject-b87f8.appspot.com",
	messagingSenderId: "92021122220",
	appId: "1:92021122220:web:68edd7153cf545e90dab09"
};

const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set, child, get, push } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
const database = getDatabase(app);

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
const auth = getAuth();

const router = {
	main: MainPageComponent,
	balance: BalancePageComponent,
	analytics: AnalyticsPageComponent,
	default: MainPageComponent,
	error: ErrorPageComponent
};

const mySPA = (function () {

	/* CONTROLLER START -------------------------------- */

	function ModuleController() {
		let myModuleContainer = null;
		let myModuleModel = null;
		let userNameInput = null;
		let emailInp = null;
		let passwInp = null;
		let emailInput = null;
		let passwordInput = null;
		let expensesSumInput = null;
		let incomeSumInput = null;
		let expensesSelect = null;
		let incomeSelect = null;

		let state = null;

		this.init = function (container, model) {
			myModuleContainer = container;
			myModuleModel = model;

			window.addEventListener("hashchange", this.updateState);

			this.updateState();
		}

		this.updateState = async function () {
			const hashPageName = location.hash.slice(1).toLowerCase();

			myModuleModel.updateState(hashPageName);
			myModuleModel.manageUser();

			if (hashPageName === 'analytics') {
				myModuleModel.drawAnalyticsExpChart();
				myModuleModel.drawAnalyticsIncChart();

				await myModuleModel.getExpensesHistory();
				await myModuleModel.getIncomeHistory();
			}

			const openLogInBtn = myModuleContainer.querySelector('.login__btn');
			const openSignInBtn = myModuleContainer.querySelector('.signin__btn');
			const submitLoginBtn = myModuleContainer.querySelector('#submitLogIn');
			const submitSignInBtn = myModuleContainer.querySelector('#submitSignIn')
			const closeLogInBtn = myModuleContainer.querySelector('#modalLogInClose');
			const closeSignInBtn = myModuleContainer.querySelector('#modalSignInClose');
			const logOutBtn = myModuleContainer.querySelector('.logout__btn');

			const addExpensesBtn = myModuleContainer.querySelector('#addExpenses');
			const addIncomeBtn = myModuleContainer.querySelector('#addIncome');

			const submitExpensesBtn = myModuleContainer.querySelector('.expenses__btn');
			const submitIncomeBtn = myModuleContainer.querySelector('.income__btn');
			const closeExpensesModalBtn = myModuleContainer.querySelector('#expensesClose');
			const closeIncomeModalBtn = myModuleContainer.querySelector('#incomeClose');

			emailInp = myModuleContainer.querySelector('#emailInp');
			passwInp = myModuleContainer.querySelector('#passwordInp');

			userNameInput = myModuleContainer.querySelector('#userNameInp');
			emailInput = myModuleContainer.querySelector('#emailInput');
			passwordInput = myModuleContainer.querySelector('#passwordInput');

			expensesSumInput = myModuleContainer.querySelector('#expensesSumInput');
			incomeSumInput = myModuleContainer.querySelector('#incomeSumInput');

			expensesSelect = myModuleContainer.querySelector('#expensesSelect');
			incomeSelect = myModuleContainer.querySelector('#incomeSelect');

			openLogInBtn.addEventListener('click', openLogInModal);
			openSignInBtn.addEventListener('click', openSignInModal);
			closeLogInBtn.addEventListener('click', closeLogInModal);
			closeSignInBtn.addEventListener('click', closeSignInModal);
			submitLoginBtn.addEventListener('click', logIn);
			submitSignInBtn.addEventListener('click', signIn);
			logOutBtn.addEventListener('click', logOut);

			if (hashPageName === 'balance') {
				myModuleModel.drawLineGraph();
				addExpensesBtn.addEventListener('click', openExpensesModal);
				addIncomeBtn.addEventListener('click', openIncomeModal);
				closeExpensesModalBtn.addEventListener('click', closeExpensesModal);
				closeIncomeModalBtn.addEventListener('click', closeIncomeModal);
				submitExpensesBtn.addEventListener('click', submitExpenses);
				submitIncomeBtn.addEventListener('click', submitIncome);
				myModuleModel.getFinancialInfo();
			}
		}

		function openLogInModal() {
			myModuleModel.openLogInModal();
		}

		function closeLogInModal() {
			myModuleModel.closeLogInModal();
		}

		function closeSignInModal() {
			myModuleModel.closeSignInModal();
		}

		function openSignInModal() {
			myModuleModel.openSignInModal();
		}

		function signIn() {
			myModuleModel.signIn(userNameInput.value, emailInput.value, passwordInput.value);
		}

		function logIn() {
			myModuleModel.logIn(emailInp.value, passwInp.value);
		}

		function logOut() {
			myModuleModel.logOut();
		}

		function openExpensesModal() {
			myModuleModel.openExpensesModal();
		}

		function openIncomeModal() {
			myModuleModel.openIncomeModal();
		}

		function closeExpensesModal() {
			myModuleModel.closeExpensesModal();
		}

		function closeIncomeModal() {
			myModuleModel.closeIncomeModal();
		}

		function submitExpenses() {
			switch (expensesSelect.value) {
				case 'Еда':
					state = 'food';
					break;
				case 'Транспорт':
					state = 'transport';
					break;
				case 'Здоровье':
					state = 'healthcare';
					break;
				case 'Развлечения':
					state = 'entertainment';
					break;
				default:
					break;
			}
			myModuleModel.submitExpenses(state, expensesSumInput.value);
			myModuleModel.getExpensesHistory();
		}

		function submitIncome() {
			switch (incomeSelect.value) {
				case 'Стипендия':
					state = 'scholarship';
					break;
				case 'Зарплата':
					state = 'salary';
					break;
				case 'Родители отправили':
					state = 'helpFromParents';
					break;
				case 'Другие источники':
					state = 'otherSources';
					break;
				default:
					break;
			}
			myModuleModel.submitIncome(state, incomeSumInput.value);
			myModuleModel.getIncomeHistory();
		}
	};

	/* CONTROLLER END -------------------------------- */

	/* MODEL START -------------------------------- */

	function ModuleModel() {
		let myModuleView = null;

		this.init = function (view) {
			myModuleView = view;
		}

		this.updateState = function (hashPageName) {
			myModuleView.renderContent(hashPageName);
		}

		this.drawAnalyticsExpChart = function () {
			myModuleView.drawExpensesChart();
		}

		this.drawAnalyticsIncChart = function () {
			myModuleView.drawIncomeChart();
		}

		this.getFinancialInfo = function () {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					let summExpenses = 0;
					let summIncome = 0;
					let balance = 0;
					const uid = user.uid;
					get(child(ref(database), `Users/${uid}/financialInfo/`))
						.then(snapshot => {
							const userFinInfo = snapshot.val();
							for (let key in userFinInfo) {
								for (let value in userFinInfo[key]) {
									if (value.includes('-expenses')) {
										for (let categoryValue in userFinInfo[key][value]) {
											summExpenses += Math.round(Number(userFinInfo[key][value][categoryValue]));
										}
									}
									if (value.includes('-income')) {
										for (let categoryValue in userFinInfo[key][value]) {
											summIncome += Math.round(Number(userFinInfo[key][value][categoryValue]));
										}
									}
								}
							}
							balance = summIncome - summExpenses;
							myModuleView.renderFinancialInfo(summIncome, summExpenses, balance);
						})
				}
			});
		}

		this.drawLineGraph = function () {
			myModuleView.drawLineGraph();
		}

		this.openLogInModal = function () {
			myModuleView.openLogInModal();
		}

		this.openSignInModal = function () {
			myModuleView.openSignInModal();
		}

		this.closeLogInModal = function () {
			myModuleView.closeLogInModal();
		}

		this.closeSignInModal = function () {
			myModuleView.closeSignInModal();
		}

		this.signIn = function (username, email, password) {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					set(ref(database, 'Users/' + user.uid),
						{
							username: username,
							email: email,
						})
					myModuleView.signIn();
					console.log(userNameInput.value, emailInput.value, passwordInput.value);
				})
				.catch((error) => {
					const errorCode = error.code;
					myModuleView.ifError(errorCode);
				});
		}

		this.logIn = function (email, password) {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					myModuleView.logIn();
				})
				.catch((error) => {
					const errorCode = error.code;
					myModuleView.ifError(errorCode);
				});
		}

		this.manageUser = function () {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					const uid = user.uid;
					get(child(ref(database), "Users/" + uid))
						.then(snapshot => {
							const user = snapshot.val();
							myModuleView.renderInfo(user);
						})
				}
			});
		}

		this.logOut = function () {
			signOut(auth).then(() => {
				myModuleView.logOut();
			})
				.catch((error) => {
					myModuleView.logOutError(error);
				});
		}

		this.openExpensesModal = function () {
			myModuleView.openExpensesModal();
		}

		this.openIncomeModal = function () {
			myModuleView.openIncomeModal();
		}

		this.closeExpensesModal = function () {
			myModuleView.closeExpensesModal();
		}

		this.closeIncomeModal = function () {
			myModuleView.closeIncomeModal();
		}

		this.submitExpenses = function (state, sum) {
			const userUid = auth.currentUser.uid;

			push(child(ref(database), `Users/${userUid}/financialInfo/expenses/${state}-expenses`), sum);

			this.getFinancialInfo();
			myModuleView.closeExpensesModal();
		}

		this.submitIncome = function (state, sum) {
			const userUid = auth.currentUser.uid;

			push(child(ref(database), `Users/${userUid}/financialInfo/income/${state}-income`), sum);
			this.getFinancialInfo();
			myModuleView.closeIncomeModal();
		}

		this.getExpensesHistory = async function () {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					const uid = user.uid;
					get(child(ref(database), `Users/${uid}/financialInfo/expenses/`))
						.then(snapshot => {
							const userExpInfo = snapshot.val();
							for (let key in userExpInfo) {
								for (let value in userExpInfo[key]) {
									const expSum = userExpInfo[key][value];
									let categ;
									switch (key) {
										case 'food-expenses':
											categ = 'Еда';
											break;
										case 'transport-expenses':
											categ = 'Транспорт';
											break;
										case 'entertainment-expenses':
											categ = 'Развлечения';
											break;
										case 'healthcare-expenses':
											categ = 'Здоровье';
											break;
										default:
											break;
									}
									myModuleView.renderExpHistoryItem(expSum, categ);
								}
							}
						})
				}
			}
			)
		}

		this.getIncomeHistory = async function () {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					const uid = user.uid;
					get(child(ref(database), `Users/${uid}/financialInfo/income/`))
						.then(snapshot => {
							const userIncInfo = snapshot.val();
							for (let key in userIncInfo) {
								for (let value in userIncInfo[key]) {
									const incSum = userIncInfo[key][value];
									let categ;
									switch (key) {
										case 'salary-income':
											categ = 'Зарплата';
											break;
										case 'scholarship-income':
											categ = 'Стипендия';
											break;
										case 'helpFromParents-income':
											categ = 'Родители отправили';
											break;
										case 'otherSources-income':
											categ = 'Другие источники';
											break;
										default:
											break;
									}
									myModuleView.renderIncHistoryItem(incSum, categ);
								}
							}
						})
				}
			}
			)
		}
	};

	/* MODEL END -------------------------------- */

	/* VIEW START --------------------------------*/

	function ModuleView() {
		let myModuleContainer = null;
		let myRouter = router;
		let myLogInModal = null;
		let mySignInModal = null;
		let expensesModal = null;
		let incomeModal = null;
		let modalOverlay = null;

		let userNameInp = null;
		let emailInp = null;
		let passwInp = null;
		let modalWarningText = null;

		let emailInput = null;
		let passwordInput = null;

		let expensesSumInput = null;
		let incomeSumInput = null;

		let username = null;

		let expensesHistoryContainer = null;
		let incomeHistoryContainer = null;

		this.init = function (container, router) {
			myModuleContainer = container;
			myRouter = router;
		}

		this.renderContent = function (hashPageName) {
			let routeName = 'default';

			if (hashPageName.length > 0) {
				routeName = hashPageName in router ? hashPageName : 'error';
			}

			window.document.title = router[routeName].title;
			myModuleContainer.innerHTML = router[routeName].render(`${routeName}-page`);

			myLogInModal = myModuleContainer.querySelector('#modalLogIn');
			mySignInModal = myModuleContainer.querySelector('#modalSignIn')
			expensesModal = myModuleContainer.querySelector('#modalExpenses');
			incomeModal = myModuleContainer.querySelector('#modalIncome');
			modalOverlay = myModuleContainer.querySelector('.modal__overlay');

			userNameInp = myModuleContainer.querySelector('#userNameInp');
			emailInp = myModuleContainer.querySelector('#emailInp');
			passwInp = myModuleContainer.querySelector('#passwordInp');

			emailInput = myModuleContainer.querySelector('#emailInput');
			passwordInput = myModuleContainer.querySelector('#passwordInput');

			expensesSumInput = myModuleContainer.querySelector('#expensesSumInput');
			incomeSumInput = myModuleContainer.querySelector('#incomeSumInput');

			username = myModuleContainer.querySelector('#username');

			expensesHistoryContainer = myModuleContainer.querySelector('.expenses__history__item');
			incomeHistoryContainer = myModuleContainer.querySelector('.income__history__item');

			modalWarningText = myModuleContainer.querySelector('.login__modal__warning');
		}

		this.drawLineGraph = function () {
			const ctx = document.getElementById('balanceGraph').getContext('2d');

			const data = {
				labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
				datasets: [{
					label: 'Баланс',
					data: [100, 200, 150, 300, 250, 400],
					backgroundColor: 'rgba(0, 255, 163, .2)',
					borderColor: '#00FFA3',
					borderWidth: 3,
					pointRadius: 0
				}]
			};

			const options = {
				scales: {
					y: {
						beginAtZero: true,
					}
				}
			};

			const lineChart = new Chart(ctx, {
				type: 'line',
				data: data,
				options: options
			});
		}

		this.drawExpensesChart = function () {
			let ctx = document.getElementById('expenses').getContext('2d');

			const data = {
				labels: [
					'Еда',
					'Транспорт',
					'Развлечения',
					'Здоровье'
				],
				datasets: [{
					label: 'Расходы',
					data: [300, 50, 100, 15],
					backgroundColor: [
						'#1AFFAC',
						'#00E693',
						'#00B372',
						'#004029'
					],
					hoverOffset: 4
				}]
			};

			let expChart = new Chart(ctx, {
				type: 'doughnut',
				data: data,
			});
		}

		this.drawIncomeChart = function () {
			let ctx = document.getElementById('income').getContext('2d');

			const data = {
				labels: [
					'Зарплата',
					'Стипендия',
					'Родители отправили',
					'Другой источник'
				],
				datasets: [{
					label: 'Доходы',
					data: [300, 50, 100, 30],
					backgroundColor: [
						'#1A83FF',
						'#0069E6',
						'#0052B3',
						'#001B3B'
					],
					hoverOffset: 4
				}]
			};

			let expChart = new Chart(ctx, {
				type: 'doughnut',
				data: data,
			});
		}

		this.renderFinancialInfo = function (income, expenses, balance) {
			document.querySelector('.main__balance').innerHTML = balanceInfo.render(income, expenses, balance);
		}

		this.renderExpHistoryItem = function (expSum, categ) {
			if (expensesHistoryContainer) {
				expensesHistoryContainer.innerHTML += analyticsExpHistoryItem.render(expSum, categ);
			}
		}

		this.renderIncHistoryItem = function (incSum, categ) {
			if (incomeHistoryContainer) {
				incomeHistoryContainer.innerHTML += analyticsIncHistoryItem.render(incSum, categ);
			}
		}

		this.openLogInModal = function () {
			myLogInModal.classList.remove('hide');
			modalOverlay.classList.remove('hide');
		}

		this.openSignInModal = function () {
			mySignInModal.classList.remove('hide');
			modalOverlay.classList.remove('hide');
		}

		this.closeLogInModal = function () {
			myLogInModal.classList.add('hide');
			modalOverlay.classList.add('hide');

			userNameInp.value = '';
			emailInp.value = '';
			passwInp.value = '';
			modalWarningText.innerHTML = '';
		}

		this.closeSignInModal = function () {
			mySignInModal.classList.add('hide');
			modalOverlay.classList.add('hide');

			emailInput.value = '';
			passwordInput.value = '';
			modalWarningText.innerHTML = '';
		}

		this.signIn = function () {
			myModuleContainer.querySelector('.header__login_btns').classList.add('hide');
			myModuleContainer.querySelector('.header__logged__wrapper').classList.remove('hide');
			this.closeSignInModal();
		}

		this.logIn = function () {
			this.closeLogInModal();
		}

		this.logOut = function () {
			myModuleContainer.querySelector('.header__login_btns').classList.remove('hide');
			myModuleContainer.querySelector('.header__logged__wrapper').classList.add('hide');
		}

		this.logOutError = function (error) {
			alert(error);
		}

		this.openExpensesModal = function () {
			expensesModal.classList.remove('hide');
			modalOverlay.classList.remove('hide');
		}

		this.openIncomeModal = function () {
			incomeModal.classList.remove('hide');
			modalOverlay.classList.remove('hide');
		}

		this.closeExpensesModal = function () {
			expensesModal.classList.add('hide');
			modalOverlay.classList.add('hide');
			expensesSumInput.value = '';
		}

		this.closeIncomeModal = function () {
			incomeModal.classList.add('hide');
			modalOverlay.classList.add('hide');
			incomeSumInput.value = '';
		}

		this.submitExpenses = function () {
			this.closeExpensesModal();
		}

		this.submitIncome = function () {
			this.closeIncomeModal();
		}

		this.ifError = function (errorCode) {
			if (errorCode === 'auth/invalid-email' || errorCode === 'auth/weak-password') {
				modalWarningText.innerHTML = 'Неверный логин или пароль. Проверьте правильность ввода. Пароль должен быть не менее 6 символов.';
			} else if (errorCode === 'auth/missing-password' || errorCode === 'auth/missing-email') {
				modalWarningText.innerHTML = 'Отсутствует логин или пароль.';
			} else if (errorCode === 'auth/email-already-in-use') {
				modalWarningText.innerHTML = 'Такой пользователь уже зарегистрирован.';
			} else if (errorCode === 'auth/user-not-found') {
				modalWarningText.innerHTML = 'Данный пользователь не найден.';
			} else if (errorCode === 'auth/wrong-password') {
				modalWarningText.innerHTML = 'Неверный пароль. Попробуйте еще раз.';
			}
		}

		this.renderInfo = function (user) {
			myModuleContainer.querySelector('.header__login_btns').classList.add('hide');
			myModuleContainer.querySelector('.header__logged__wrapper').classList.remove('hide');

			username.innerHTML = `Hello, ${user.username}`;
		}
	};

	/* VIEW END --------------------------------*/

	return {
		init: function ({ container, router }) {
			this.main(container);

			const view = new ModuleView();
			const controller = new ModuleController();
			const model = new ModuleModel();

			view.init(document.getElementById(container), router);
			model.init(view);
			controller.init(document.getElementById(container), model);
		},

		main: function (container) {
			const root = document.getElementById(container);
		}
	}
}());

document.addEventListener("DOMContentLoaded", mySPA.init({
	container: "wrapper",
	router: router,
}));