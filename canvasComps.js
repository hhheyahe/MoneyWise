const header = {
  render: () => {
    return `
    <div class="header">
    <div class="header__logo">
      <img src="images/logoMW.png" title="logo" alt="logo MoneyWise">
    </div>
    <div class="header__menu" id="headerwrapper">
      <nav id="menuNav" class="headermenu">
        <ul>
          <li><a href="#main" title="Main page" class="menu__link">Главная</a></li>
          <li><a href="#balance" title="Balance page" class="menu__link">Баланс</a></li>
          <li><a href="#analytics" title="Analytics page" class="menu__link">Отчеты</a></li>
          <li><a href="#" title="Savings page">Накопления</a></li>
          <li><a href="#" title="Credit page">Кредиты/рассрочки</a></li>
        </ul>
      </nav>
    </div>
    <div class="header__login_btns">
      <button class="login__btn">Войти</button>
      <button class="signin__btn">Зарегистрироваться</button>
    </div>
    <div class="header__logged__wrapper hide">
      <p id="username"></p>
      <button class="logout__btn">Выйти</button>
    </div>
  </div>
    `;
  }
};

const footer = {
  render: () => {
    return `
    <div class="footer">
    <div class="footer__logo">
        <img src="images/logoMW.png" title="logo" alt="MoneyWise logo">
    </div>
    <div class="footer__menu">
      <nav class="footermenu" id="footerNav">
        <ul>
          <li><a href="#main" title="Main page" class="menu__link">Главная</a></li>
          <li><a href="#balance" title="Balance page" class="menu__link">Баланс</a></li>
          <li><a href="#analytics" title="Analytics" class="menu__link">Отчеты</a></li>
          <li><a href="#" title="Savings page">Накопления</a></li>
          <li><a href="#" title="Credit page">Кредиты/рассрочки</a></li>
          <li><a href="#" title="Help page">Помощь</a></li>
        </ul>
      </nav>
    </div>
    <div class="footer__copyright">
        <p>&copy; 2023 MoneyWise. All rights reserved.</p>
    </div>
  </div>
    `
  }
}

/* BALANCE PAGE COMPONENTS */
const balanceInfo = {
  render: (income, expenses, balance) => {
    return `
      <div class="balance__info">
          <div class="balance__info__item">
              <div class="item__pic">
                  <img src="images/balance_pic_inc.png" title="income" alt="income pic">
              </div>
              <div class="item__text">
                  <p>Доходы за месяц</p>
                  <p id="currentIncome" class="currentIncome">$${income}</p>
              </div>
              <div class="item__big__pic">
                  <img src="images/balance_bp_inc.png" title="income scale" alt="income scale big pic">
              </div>
          </div>
          <div class="balance__info__item">
              <div class="item__pic">
                  <img src="images/balance_pic_exp.png" title="expenses" alt="expenses pic">
              </div>
              <div class="item__text">
                  <p>Расходы за месяц</p>
                  <p class="currentExpenses">$${expenses}</p>
              </div>
              <div class="item__big__pic">
                  <img src="images/balance_bp_exp.png" title="income scale" alt="income scale big pic">
              </div>
          </div>
          <div class="balance__info__item balance__item">
              <div class="item__text">
                  <p>Текущий баланс</p>
                  <p id="currentBalance">$${balance}</p>
              </div>
              <div class="item__big__pic">
                  <img src="images/balance_coin.png" title="coin" alt="coin img">
              </div>
          </div>
    `
  }
}

const LineGraphCanv = {
  render: () => {
    return `
    <div class="balance__scale">
      <div class="scale__wrapper">
          <div class="scale__text">
              <p>Месячный отчет</p>
          </div>
          <canvas class="line__graph" id="balanceGraph" height="300" width="800"></canvas>
      </div>
    `
  }
}

const addBtns = {
  render: () => {
    return `
      <div class="scale__buttons">
        <button id="addIncome">Добавить доход</button>
        <button id="addExpenses">Добавить расход</button>
      </div>
    </div>
    `
  }
}

const balanceTable = {
  render: () => {
    return `
    <div class="balance__actions__list">
      <p>Последние транзакции</p>
      <table>
        <thead>
            <tr>
                <th>Категория</th>
                <th>Дата</th>
                <th>Сумма</th>
            </tr>
        </thead>
      </table>
    </div>
  </div>
    `
  }
}

/* ANALYTICS PAGE COMPONENTS */

const analyticsTitle = {
  render: () => {
    return `
    <div class="main__analytics">
      <div class="main__text">
        <h1 class="title">Привет, Username</h1>
        <p>Вот Ваша аналитика за месяц.</p>
      </div>
    </div>
    `;
  },
};

const analyticsDoughnutCanvExpenses = {
  render: () => {
    return `
    <div class="main__expenses">
      <div class="main__expenses__item">
        <div class="main__expenses__text">
          <p>Расходы</p>
          <p>1-30 июля, 2023</p>
        </div>
        <canvas id="expenses" class="main__expenses__canv" width="300" height="300"></canvas> 
        <div class="expenses__legend"></div>   
      </div>
    `;
  },
};

const analyticsExpHistory = {
  render: () => {
    return `
      <div class="main__expenses__item">
        <div class="main__expenses__history__text">
          <p>История расходов</p>
        </div>
        <div class="expenses__history__item">
        </div>
      </div>
    </div>
    `;
  },
};

const analyticsExpHistoryItem = {
  render: (sum, categ) => {
    return `
    <div class="expenses__item">
      <div class="expenses__item__div">
        <img class="expenses__bg" src="images/greenBg.png">
        <p class="category__expenses">${categ}</p>
      </div>
      <p class="expenses__sum">$${sum}</p>
    </div>
    `;
  },
};

const analyticsDoughnutCanvIncome = {
  render: () => {
    return `
    <div class="main__income">
      <div class="main__income__item">
        <div class="main__income__text">
          <p>Доходы</p>
          <p>1-30 июля, 2023</p>
        </div>
        <canvas id="income" class="main__income__canv" width="300" height="300"></canvas>  
        <div class="income__legend"></div>  
      </div>
    `;
  },
};

const analyticsIncHistory = {
  render: () => {
    return `
    <div class="main__income__item">
          <div class="main__income__history__text">
            <p>История доходов</p>
          </div>
          <div class="income__history__item">

          </div>
      </div>
      </div>
      </div>
    `;
  },
};

const analyticsIncHistoryItem = {
  render: (sum, categ) => {
    return `
    <div class="income__item">
    <div class="income__item__div">
      <img class="income__bg" src="images/blueBg.png">
      <p class="category__income">${categ}</p>
    </div>
      <p class="income__sum">$${sum}</p>
      </div>
    `;
  },
};

const loginModal = {
  render: () => {
    return `
    <div class="login__modal hide" id="modalLogIn">
      <div class="login__modal__header">
        <p>Вход</p>
        <button class="close__btn" id="modalLogInClose"></button>
      </div>
      <div class="login__info__container">
        <!--<input id="userNameInp" type="text" placeholder="Введите имя пользователя" required>-->
        <input id="emailInp" type="text" placeholder="Введите электронную почту" required>
        <input id="passwordInp" type="password" placeholder="Введите пароль" required>
      </div>
      <div class="login__modal__warning"></div>
      <div class="login__submit__btn">
        <button id="submitLogIn" class="submit__btn">Подтвердить</button>
      </div>
  </div>
    `;
  }
}

const signinModal = {
  render: () => {
    return `
    <div class="signin__modal hide" id="modalSignIn">
      <div class="signin__modal__header">
        <p>Регистрация</p>
        <button class="close__btn" id="modalSignInClose"></button>
      </div>
      <div class="signin__info__container">
        <input id="userNameInp" type="text" placeholder="Введите имя пользователя" required>
        <input id="emailInput" type="text" placeholder="Введите электронную почту" required>
        <input id="passwordInput" type="password" placeholder="Введите пароль" required>
      </div>
      <div class="signin__modal__warning"></div>
      <div class="signin__submit__btn">
        <button id="submitSignIn" class="submit__btn">Подтвердить</button>
      </div>
    </div>
    `;
  }
}

const expensesModal = {
  render: () => {
    return `
    <div class="expenses__modal hide" id="modalExpenses">
      <div class="expenses__modal__header">
        <p>Расход</p>
        <button class="close__btn" id="expensesClose"></button>
      </div>
      <div class="expenses__info__container">
        <select id="expensesSelect">
          <option>Еда</option>
          <option>Транспорт</option>
          <option>Развлечения</option>
          <option>Здоровье</option>
        </select>
        <input id="expensesSumInput" type="number" placeholder="Введите сумму" required>
      </div>
      <div class="expenses__submit__btn">
        <button class="expenses__btn">Подтвердить</button>
      </div>
    </div>
    `;
  }
};

const incomeModal = {
  render: () => {
    return `
    <div class="income__modal hide" id="modalIncome">
      <div class="income__modal__header">
        <p>Доход</p>
        <button class="close__btn" id="incomeClose"></button>
      </div>
      <div class="income__info__container">
        <select id="incomeSelect">
          <option>Зарплата</option>
          <option>Стипендия</option>
          <option>Родители отправили</option>
          <option>Другой источник</option>
        </select>
        <input id="incomeSumInput" type="number" placeholder="Введите сумму" required>
      </div>
      <div class="income__submit__btn">
        <button class="income__btn">Подтвердить</button>
      </div>
    </div>
    `;
  }
}
