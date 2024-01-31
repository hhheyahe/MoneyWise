/* Главная страница */
const MainPageComponent = {
  id: 'main',
  title: 'Главная страница',
  render: () => {
    return `
     ${header.render()}
      <div class="main">
          <div class="main__text">
              <h1 class="title">Эффективно отслеживайте расходы и доходы</h1>
              <p>Наш трекер упрощает процесс отслеживания ваших расходов и доходов. Легко записывайте ваши транзакции, категоризируйте их и добавляйте соответствующие детали, такие как способы оплаты или спиcания.</p>
          </div>
          <div class="main__features">
              <div class="main__features__item">
                  <div class="feature__img">
                      <img src="images/main_f1.png" title="feat1" alt="feature image">
                  </div>
                  <div class="feature__text">
                      <p>Оцените эффективность</p>
                      <p>Определяйте свою финансовую эффективность и улучшайте финансовую позицию.</p>
                  </div>
              </div>
              <div class="main__features__item">
                  <div class="feature__img">
                      <img src="images/main_f2.png" title="feat2" alt="feature image">
                  </div>
                  <div class="feature__text">
                      <p>Аналитика</p>
                      <p>Получите полную информацию о расходах и доходах. Все ваши данные доступны в одном месте благодаря MoneyWise.</p>
                  </div>
              </div>
              <div class="main__features__item">
                  <div class="feature__img">
                      <img src="images/main_f3.png" title="feat3" alt="feature image">
                  </div>
                  <div class="feature__text">
                      <p>Удобный интерфейс</p>
                      <p>MoneyWise предлагает интуитивно понятный интерфейс, который делает управление финансами понятным и удобным.</p>
                  </div>
              </div>
              <div class="main__features__item">
                  <div class="feature__img">
                      <img src="images/main_f4.png" title="feat4" alt="feature image">
                  </div>
                  <div class="feature__text">
                      <p>Кроссплатформенность</p>
                      <p>Наш трекер финансов доступен на различных платформах, включая веб-браузеры, мобильные устройства и планшеты.</p>
                  </div>
              </div>
              <div class="main__features__item">
                  <div class="feature__img">
                      <img src="images/main_f5.png" title="feat5" alt="feature image">
                  </div>
                  <div class="feature__text">
                      <p>Категоризация</p>
                      <p>Вы можете создавать для расходов и доходов собственные категории, чтобы классифицировать их в соответствии с вашими потребностями.</p>
                  </div>
              </div>
              <div class="main__features__item">
                  <div class="feature__img">
                      <img src="images/main_f6.png" title="feat6" alt="feature image">
                  </div>
                  <div class="feature__text">
                      <p>Наглядный анализ</p>
                      <p>Графическое представление данных предоставляет возможность визуализировать свою финансовую активность.</p>
                  </div>
              </div>
          </div>
          <div class="main__pros">
              <div class="main__text">
                  <h2 class="title">Управление финансами <br>Еще не было настолько простым</h2>
                  <p>MoneyWise поможет Вам эффективно управлять своими финансами. С его помощью Вы сможете отслеживать все доходы и расходы, создавать бюджеты и планировать свои финансы на будущее. Кроме того, приложение предоставляет возможность анализировать свои траты и выявлять слабые места в бюджете, устанавливать цели и отслеживать свой прогресс в их достижении.</p>
              </div>
              <div class="main__pros__container">
                  <div class="main__pros__item">
                      <div class="pro__img">
                          <img src="images/main_p1.png" title="pro1" alt="pro image">
                      </div>
                      <div class="main__pros__text">
                          <p>Все Ваши финансы в одном месте</p>
                          <p>Вы можете легко записывать все свои доходы и расходы, указывать категории, добавлять комментари и прикреплять квитанции или документы. Это позволять иметь полный обзор Вашего бюджета!</p>
                      </div>
                  </div>
                  <div class="main__pros__item">
                      <div class="pro__img">
                          <img src="images/main_p2.png" title="pro2" alt="pro image">
                      </div>
                      <div class="main__pros__text">
                          <p>Анализ и отслеживание тенденций</p>
                          <p>Анализируйте свои финансовые операции и отслеживайте тенденции. Трекер предоставит графики, диаграммы и отчеты, которые помогут понять, какие категории расходов более значительны, а какие источники доходов наиболее прибыльные.</p>
                  </div>
              </div>
            <div class="main__pros__item">
              <div class="pro__img">
                  <img src="images/main_p1.png" title="pro3" alt="pro image">
              </div>
              <div class="main__pros__text">
                <p>Бюджетирование и постановка целей</p>
                <p>Вы можете задать месячные лимиты для различных категорий расходов и следить за их соблюдением. Трекер поможет отслеживать прогресс в накоплении на отпуск, выплату долгов или крупную покупку.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__overlay hide"></div>
      ${loginModal.render()}
      ${signinModal.render()}
      ${footer.render()}
      `;
  }
};

/* Страница Баланс */
const BalancePageComponent = {
  id: 'balance',
  title: 'Страница Баланс',
  render: () => {
    return `
      ${header.render()}
      <div class="main__balance"></div>
      ${LineGraphCanv.render()}
      ${addBtns.render()}
      ${balanceTable.render()}
      ${loginModal.render()}
      ${signinModal.render()}
      ${expensesModal.render()}
      ${incomeModal.render()}
      <div class="modal__overlay hide"></div>
      ${footer.render()}
    `;
  }
};

/* Страница Отчеты */
const AnalyticsPageComponent = {
  id: 'analytics',
  title: 'Страница Отчеты',
  render: () => {
    return `
      ${header.render()}
      ${analyticsTitle.render()}
      
      ${analyticsDoughnutCanvExpenses.render()}
      ${analyticsExpHistory.render()}
      ${analyticsDoughnutCanvIncome.render()}
      ${analyticsIncHistory.render()}
      ${footer.render()}
      ${loginModal.render()}
      ${signinModal.render()}
      <div class="modal__overlay hide"></div>
      `;
  }
};

/* Страница Ошибка 404 */
const ErrorPageComponent = {
  id: 'error',
  title: 'Страница 404',
  render: () => {
    return `
      <div class="error__wrapper">
        <div class="error__img">
          <img src="images/error-404.png" alt="404" title="404 image">
        </div>
        <div class="error__text">
          <h1>Произошла ошибка!</h1>
          <p>Похоже, такой страницы не существует...</p>
        </div>
      </div>
    `;
  }
};