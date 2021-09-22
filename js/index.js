"use strict";
// Show and Hide Header
$(document).ready(function () {
  $("#head_browse").click(function () {
    if ($("#body_browse").css("display") == "none") {
      $("#chevron").css({ transform: "rotate(" + 180 + "deg)" });
    } else {
      $("#chevron").css({ transform: "rotate(" + 0 + "deg)" });
    }

    showAndHideBody("browse");
  });

  $(".header__search_show_btn").click(function () {
    $(".header__body").hide();
    $("#head_search").toggleClass("hidden");
  });
  // $("#head_search").click(function () {
  //   showAndHideBody("search");
  // });
  $("#head_item-add").click(function () {
    showAndHideBody("item-add");
  });
  $("#head_item-noti").click(function () {
    showAndHideBody("item-noti");
  });
  $("#head_user").click(function () {
    showAndHideBody("user");
  });

  function showAndHideBody(bodyID) {
    $(".header__body:not(#body_" + bodyID + ")").hide();
    $("#head_search").removeClass("hidden");
    $("#body_" + bodyID).toggle();
  }

  $(".header__head").click(function () {
    $(".popup__message").removeClass("active");
  });
  $(".header__line").click(function () {
    $(".header__body").hide();
    $(".popup__message").removeClass("active");
  });
});

// Sort Header and Scroll Top
$(document).ready(function () {
  let page = document.getElementsByClassName("page")[0];
  window.addEventListener(
    "scroll",
    function (event) {
      const top = this.scrollY;
      if (top <= 96 && page.className.includes("scroll")) {
        page.className = page.className.replace(" scroll", "");
      } else if (top >= 96 && !page.className.includes("scroll")) {
        page.className += " scroll";
      }
      if (top > 500) {
        $(".popup_scrollTop").show();
      } else {
        $(".popup_scrollTop").hide();
      }
    },
    false
  );

  $(".popup_scrollTop").click(function () {
    $("html").animate({ scrollTop: 0 });
  });
});

// Show and Hide SideBar
$(document).ready(function () {
  $("#sidebar__buger_dots").click(function () {
    $("#sidebar").toggleClass("active");
    $("#page__wrapper").toggleClass("active");
  });
  $("#sidebar__buger_close").click(function () {
    $("#sidebar").removeClass("hidden");
  });
  $("#showSidebar_btn").click(function () {
    $("#sidebar").toggleClass("hidden");

    if ($(window).width() < 768) {
      checkDisplaySb();
    }
  });

  function checkDisplaySb() {
    if ($("#sidebar").hasClass("hidden")) {
      $("html").css("overflow", "hidden");
    } else {
      $("html").css("overflow", "auto");
    }
  }

  $(window).resize(function () {
    if ($(window).width() >= 768) {
      if ($("#sidebar").hasClass("hidden")) {
        $("html").css("overflow", "auto");
        $("#sidebar").removeClass("hidden");
      }
    } else if ($(window).width() <= 401) {
    }
  });
});

// Load Following List
$(document).ready(function () {
  let usersApi = "http://localhost:3000/users";
  let counter = 0;
  let myId = 37;

  async function getUsers() {
    try {
      let res = await fetch(usersApi);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function getFollowing() {
    let users = await getUsers();

    let user = users.find((user) => {
      return user.userId === myId;
    });

    let listUser = user.following.map((userIdTemp, index) => {
      let userItem = users.find((user) => {
        return user.userId === userIdTemp;
      });

      return userItem;
    });

    return listUser;
  }

  async function renderFollowing(indexPage) {
    try {
      let followings = await getFollowing();
      let numberFollowings = followings.length;

      $(".sidebar__caption.following .sidebar__counter").text(numberFollowings);

      if (counter * 6 < numberFollowings) {
        let listFollowings = followings.map((following, index) => {
          if (index >= indexPage * 6 && index < (indexPage + 1) * 6) {
            let html = `<a href="/html/channelProfile.html?userId=${
              following.userId
            }" class="sidebar__item ${
              following.status == false ? "" : "online"
            }">
            <div class="sidebar__ava ${
              following.confirm == false ? "" : "confirm"
            }">
              <img class="ava-image" src="${following.avata}"
              alt="" class="sidebar__pic">
            </div>
            <div class="sidebar__name">${following.name}</div>
          </a>`;

            return html;
          }
        });

        $(".sidebar__group .sidebar__list").append(listFollowings);

        $(".sidebar__group .sidebar__list").scrollTop(
          $(".sidebar__group .sidebar__list")[0].scrollHeight
        );
        ++counter;
      } else {
        let color = "yellow";
        let linkIcon = '<ion-icon name="alert-outline"></ion-icon>';
        let title = "Can't get more";
        let detail = "Loaded all the people who are following";
        let actions = `<div class="pm__action purple">View All Following</div>
                        <div class="pm__action">Not now</div>`;

        popupMessage(color, linkIcon, title, detail, actions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  renderFollowing(counter);

  $(".sidebar__more").click(function () {
    renderFollowing(counter);
  });

  $(".popup_mes__bg, .popup_mes__btn").click(function () {
    $(".popup__message").hide();
  });
});

// Switch Dark Mode
$(document).ready(function () {
  let isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
  if (isDarkMode == true && $("#switch__input").is(":checked") == false) {
    $("#switch__btn").css("transform", "translateX(" + 0 + "px)");
    $("#switch__input").prop("checked", true);
    $(".page:first-child").removeClass("toggle");
  } else if (
    isDarkMode == false &&
    $("#switch__input").is(":checked") == true
  ) {
    $("#switch__btn").css("transform", "translateX(" + -28 + "px)");
    $("#switch__input").prop("checked", false);
    $(".page:first-child").addClass("toggle");
  }

  $("#switch__box").click(function () {
    switchDarkMode();
  });

  function switchDarkMode() {
    if ($("#switch__input").is(":checked")) {
      $("#switch__btn").css("transform", "translateX(" + -28 + "px)");
      $("#switch__input").prop("checked", false);

      isDarkMode = false;
    } else {
      $("#switch__btn").css("transform", "translateX(" + 0 + "px)");
      $("#switch__input").prop("checked", true);

      isDarkMode = true;
    }

    $(".page:first-child").toggleClass("toggle");

    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }
});

// Nav Slide
$(document).ready(function mainSlide() {
  let listSlideMain = $(".main__slide");

  let listSlidePreview = $(".main__preview");
  let numberSlide = listSlidePreview.length;
  // console.log(listSlidePreview.width());

  let trackNav = $(".main__nav .slick-track");
  let widthTrackNav = $(".main__nav .slick-track").width();
  // console.log(widthTrackNav / numberSlide);

  listSlidePreview.on("click", function (e) {
    let currentIndex = $(".main__preview").index(
      $(".main__preview.slick-current")
    );
    let clickIndex = $(".main__preview").index($(this));

    changeSelectedSlide(currentIndex, clickIndex);

    changeSelectedSlide(currentIndex, clickIndex);
    // console.log(currentIndex + "," + numberSlide);
  });

  // Event Click Button Slide
  let movement = 0;
  $("#nav-slick-prev").click(function () {
    movement = movement - widthTrackNav / numberSlide;
    trackNav.css({ marginLeft: -movement + "px" });

    let currentIndex = $(".main__preview").index(
      $(".main__preview.slick-current")
    );
    changeSelectedSlide(currentIndex, currentIndex - 1);
  });
  $("#nav-slick-next").click(function () {
    movement = movement + widthTrackNav / numberSlide;
    trackNav.css({ marginLeft: -movement + "px" });

    let currentIndex = $(".main__preview").index(
      $(".main__preview.slick-current")
    );
    changeSelectedSlide(currentIndex, currentIndex + 1);
  });

  function changeSelectedSlide(currentIndex, clickIndex) {
    listSlidePreview.eq(currentIndex).removeClass("slick-current");
    listSlidePreview.eq(clickIndex).addClass("slick-current");

    listSlideMain.eq(currentIndex).removeClass("active");
    listSlideMain.eq(clickIndex).addClass("active");
  }
  function setProcessBar(index, total) {
    let precent = (index / total) * 100;

    $(".main__progress").css("background-size", precent + "%");
  }
});

// Pagination 1

$(document).ready(() => {
  let linkTopicsAPI = " http://localhost:3000/liveCollections";
  let numberCardsInPage = 4;
  let minValue = 1;
  let middleValue = 5;
  let maxValue = 0;
  let check = true;

  function htmlPagingItem(value) {
    return `<li class="paging__item">
    <input type="radio" id="live_paging__btn" 
          class="paging__btn live_paging__btn"
          name="live_paging" value="${value}">
    <div class="paging__child">${value}</div>
    </li>`;
  }
  function htmlPagingArrow() {
    return `<li class="paging__arrow paging__arrow_left" id="live_paging_al">
              <ion-icon class="paging__icon" name="chevron-back"></ion-icon>
            </li>

            <li class="paging__arrow paging__arrow_right" id="live_paging_ar">
               <ion-icon class="paging__icon" name="chevron-forward"></ion-icon>
            </li>`;
  }
  function htmlPagingScroll() {
    return `<li class="paging__item live__paging_index">
                  <div class="paging__dot">...</div>
                  <input type="number" name="live__paging_scroll" id="live_paging__scroll"
                  class="paging__scroll">
                  <div class="mes_invalid" id="live_mes_invalid">Input invalid</div>
                </li>`;
  }
  function setMaxValue(value) {
    let html = htmlPagingItem(value);
    $("#live_collection__paging .paging__list").append(html);

    $("#live_collection__paging .paging__child.last-child").text(value);
    $(".live_paging__btn.input_last_child").attr({
      value: value,
    });
  }
  function exportHtml(maxIndex) {
    if (maxIndex == 0) {
      $(".collection__paging").hide();
    } else if (maxIndex == 1) {
      let html = htmlPagingItem(1);
      $("#live_collection__paging .paging__list").append(html);
    } else {
      $("#live_collection__paging .paging__list").append(htmlPagingArrow());

      for (let i = 1; i <= maxValue && i <= 5; i++) {
        let html = htmlPagingItem(i);
        $("#live_collection__paging .paging__list").append(html);
      }
      // TODO

      if (maxIndex > 7) {
        $("#live_collection__paging .paging__list").append(htmlPagingScroll());

        setMaxValue(maxIndex);

        $("#live_paging__scroll").attr({
          max: maxIndex - 1,
          min: middleValue + 1,
          value: middleValue + 1,
        });

        eventInput();
      }

      eventClickElement();
      $("#live_paging_al").hide();
    }
    eventClickArrow();
    $(".live_paging__btn").val([minValue]);
  }
  function htmlCard(card, user) {
    let html = `<a href="html/watching.html?cardLiveId=${
      card.cartId
    }" class="card">
    <div class="card__preview">
        <img class="card__pic" src="${card.background}"
            alt="">
    </div>

    <div class="card__body">
        <div class="card__title">${card.title}</div>
        <div class="card__user">
            <div class="card__ava ${user.confirm == true ? " confirm" : ""}">
                <img class="card__pic" src="${user.avata}" alt="">
            </div>
            <div class="card__desc">
                <div class="card__man">${user.name}</div>
                <div class="card__game">${card.game}®</div>
            </div>
        </div>
    </div>

    <div class="card__foot">
        <div class="live">
            <ion-icon name="wifi"></ion-icon>
            Live
        </div>
        <div class="card__status status blue">${card.view}</div>
    </div>
</a>`;

    $(".collection_live").append(html);
  }

  async function getLiveCollections() {
    try {
      let res = await fetch(linkTopicsAPI);
      return await res.json();
    } catch (error) {
      console.log(error);

      let color = "red";
      let linkIcon = '<ion-icon name="warning-outline"></ion-icon>';
      let title = "Load Live Collection Failed";
      let detail = "Link API Live Collection broken";
      let actions = ``;

      popupMessage(color, linkIcon, title, detail, actions);
    }
  }
  async function getListCards(liveCollections, indexPage) {
    let numCardInAPI = liveCollections.cards.length;
    let numberCardInWeb = $(".collection_live .card").length;

    if (numberCardInWeb == 0) {
      let maxValueTemp1 = numCardInAPI / numberCardsInPage;
      let maxValueTemp2 = Math.floor(numCardInAPI / numberCardsInPage);

      if (maxValueTemp1 - maxValueTemp2 > 0) {
        maxValue = maxValueTemp2 + 1;
      } else {
        maxValue = maxValueTemp1;
      }

      exportHtml(maxValue);
    }

    let indexPageInt = parseInt(indexPage) - 1;
    let startNum = indexPageInt * numberCardsInPage;
    let endNum = (indexPageInt + 1) * numberCardsInPage;

    if (endNum > numCardInAPI) {
      endNum = numCardInAPI;
    }

    let newCardsList = [];
    liveCollections.cards.forEach((card, index) => {
      if (index >= startNum && index < endNum) {
        newCardsList.push(card);
      }
    });

    return newCardsList;
  }
  async function renderCards(newCardsList) {
    let numberCardInList = newCardsList.length;
    let numberCardInListTemp = 0;

    if (numberCardInList < numberCardsInPage) {
      check = false;
      numberCardInListTemp = numberCardInList;
      for (let i = numberCardInList; i < numberCardsInPage; i++) {
        $(".collection_live .card").eq(i).css("display", "none");
      }
    } else if (numberCardInList == numberCardsInPage && check == false) {
      check = true;

      for (let i = numberCardInListTemp; i < numberCardsInPage; i++) {
        $(".collection_live .card").eq(i).css("display", "flex");
      }
    }

    let numCard = $(".collection_live .card").length;

    newCardsList.forEach((card, index) => {
      let uD = card.userId;

      let linkUsersAPI = "http://localhost:3000/users";
      fetch(linkUsersAPI)
        .then((response) => response.json())

        .then((users) => {
          let user = users.find((user) => {
            return user.userId === uD;
          });

          if (numCard == 0) {
            htmlCard(card, user);
          } else {
            changeInfoCard(card, user, index);
          }
        })

        .catch((err) => {
          console.log(err);
        });
    });
  }
  function changeInfoCard(card, user, index) {
    $(".collection_live .card")
      .eq(index)
      .prop("href", `html/watching.html?cardLiveId=${card.cartId}`);

    $(".collection_live .card__man").eq(index).text(user.name);
    if (user.confirm == true) {
      $(".collection_live .card__ava").eq(index).addClass("confirm");
    } else {
      $(".collection_live .card__ava").eq(index).removeClass("confirm");
    }

    $(".collection_live .card__title").eq(index).text(card.title);
    $(".collection_live .card__game").eq(index).text(card.game);
    $(".collection_live .card__status").eq(index).text(card.view);
    $(".collection_live .card__preview .card__pic")
      .eq(index)
      .prop("src", card.background);
    $(".collection_live .card__ava .card__pic")
      .eq(index)
      .prop("src", user.avata);
  }

  async function renderTitleLiveCollection() {
    let liveCollections = await getLiveCollections();

    $(".collection__title").eq(0).text(liveCollections[0]?.topic);
  }
  async function renderCardsByIndexPage(indexPage) {
    let liveCollections = await getLiveCollections();

    let newCardsList = await getListCards(liveCollections[0], indexPage);

    await renderCards(newCardsList);
  }

  renderCardsByIndexPage(1);
  renderTitleLiveCollection();

  $(window).resize(function () {
    if ($(window).width() <= 601) {
      $("#live_collection__paging .paging__item").eq(2).hide();
      $("#live_collection__paging .paging__item").eq(3).hide();
      $("#live_collection__paging .paging__item").eq(4).hide();
      middleValue = 2;
      $("#live_paging__scroll").attr({
        value: middleValue + 1,
      });
    } else {
      $("#live_collection__paging .paging__item").eq(2).show();
      $("#live_collection__paging .paging__item").eq(3).show();
      $("#live_collection__paging .paging__item").eq(4).show();
      middleValue = 5;
      $("#live_paging__scroll").attr({
        value: middleValue + 1,
      });
    }
  });

  // Input Index
  function eventInput() {
    $("#live_paging__scroll").on("change", function () {
      let value = parseInt($("#live_paging__scroll").val());
      if (value < middleValue + 1 || value > maxValue - 1) {
        $("#live_mes_invalid").text(
          "Input number between 6 - " + (maxValue - 1)
        );
        $("#live_mes_invalid").show();
      } else {
        $("#live_mes_invalid").hide();
        renderCardsByIndexPage(value);
      }
      // hiddenBtn();
    });
  }

  function eventClickElement() {
    // click to each index
    $(".live_paging__btn").click(function () {
      let index = $("input[name='live_paging']:checked").val();
      $(".live__paging_index").removeClass("active");

      // console.log(index); // TODO get DB
      renderCardsByIndexPage(index);
      hiddenBtn();
    });
  }

  function eventClickArrow() {
    // click button left
    $("#live_paging_al").click(function downPageIndex() {
      let value = parseInt($(".live_paging__btn:checked").val());

      if (Number.isInteger(value) && value > 1) {
        let newValue = value - 1;

        if (value == maxValue && maxValue > 7) {
          $(".live_paging__btn").val([""]);
          $(".live__paging_index").addClass("active");
          $("#live_paging__scroll").val([newValue]);
          renderCardsByIndexPage(newValue);
        } else {
          $(".live_paging__btn").val([newValue]);
          renderCardsByIndexPage(newValue);
        }

        // console.log(newValue); // TODO get DB

        // TODO : get topics from DB with value are index Page
      } else if (Number.isNaN(value)) {
        // Value is NAN
        $(".live_paging__btn").val([""]);
        $(".live__paging_index").addClass("active");

        let newValue = parseInt($("#live_paging__scroll").val()) - 1;

        if (newValue > middleValue && newValue < maxValue) {
          $("#live_paging__scroll").val([newValue]);
          renderCardsByIndexPage(newValue);
        } else {
          $(".live_paging__btn").val([newValue]);
          $(".live__paging_index").removeClass("active");
          renderCardsByIndexPage(newValue);
        }

        // console.log(newValue); // TODO get DB
      }
      hiddenBtn();
    });

    // click button right
    $("#live_paging_ar").click(function upPageIndex() {
      let value = parseInt($(".live_paging__btn:checked").val()) + 1;

      if (Number.isInteger(value)) {
        if (value <= middleValue || value == maxValue) {
          $(".live_paging__btn").val([value]);
          renderCardsByIndexPage(value);
        } else if (value == middleValue + 1) {
          $(".live_paging__btn").val([""]);
          $(".live__paging_index").addClass("active");
          $("#live_paging__scroll").val([middleValue + 1]);
          renderCardsByIndexPage(value);
        }

        // console.log(value); // TODO get DB
      } else {
        // Value is NAN
        let newValue = parseInt($("#live_paging__scroll").val()) + 1;

        if (newValue > middleValue && newValue < maxValue) {
          $("#live_paging__scroll").val([newValue]);
          renderCardsByIndexPage(newValue);
        } else {
          $(".live_paging__btn").val([newValue]);
          $(".live__paging_index").removeClass("active");
          renderCardsByIndexPage(newValue);
        }

        // console.log(newValue); // TODO get DB
      }
      hiddenBtn();
    });
  }

  function hiddenBtn() {
    let newValue = parseInt($(".live_paging__btn:checked").val());
    if (newValue == minValue) {
      $("#live_paging_al").hide();
      $("#live_paging_ar").show();
    } else if (newValue == maxValue) {
      $("#live_paging_ar").hide();
      $("#live_paging_al").show();
    } else {
      $("#live_paging_al").show();
      $("#live_paging_ar").show();
    }
  }
});

// Pagination 2
$(document).ready(() => {
  let linkVideosAPI = "http://localhost:3000/videos";
  let linkUserAPI = "http://localhost:3000/users";
  let linkGameAPI = "http://localhost:3000/games";

  let numberVideosInPage = 8;
  let minValue = 1;
  let middleValue = 5;
  let maxValue = 0;

  function htmlPagingItem(value) {
    return `<li class="paging__item">
    <input type="radio" id="recomment_paging__btn" 
          class="paging__btn recomment_paging__btn"
          name="recomment_paging" value="${value}">
    <div class="paging__child">${value}</div>
    </li>`;
  }
  function htmlPagingArrow() {
    return `<li class="paging__arrow paging__arrow_left" id="recomment_paging_al">
              <ion-icon class="paging__icon" name="chevron-back"></ion-icon>
            </li>

            <li class="paging__arrow paging__arrow_right" id="recomment_paging_ar">
               <ion-icon class="paging__icon" name="chevron-forward"></ion-icon>
            </li>`;
  }
  function htmlPagingScroll() {
    return `<li class="paging__item recomment__paging_index">
                  <div class="paging__dot">...</div>
                  <input type="number" name="recomment__paging_scroll" id="recomment_paging__scroll"
                  class="paging__scroll">
                  <div class="mes_invalid" id="recomment_mes_invalid">Input invalid</div>
                </li>`;
  }
  function setMaxValue2(value) {
    let html = htmlPagingItem(value);
    $("#recomment_collection__paging .paging__list").append(html);

    $("#recomment_collection__paging .paging__child.last-child").text(value);
    $(".recomment_paging__btn.input_last_child").attr({
      value: value,
    });
  }
  function exportHtml(maxIndex) {
    if (maxIndex == 0) {
      $(".collection__paging").hide();
    } else if (maxIndex == 1) {
      let html = htmlPagingItem(1);
      $("#recomment_collection__paging .paging__list").append(html);
    } else {
      $("#recomment_collection__paging .paging__list").append(
        htmlPagingArrow()
      );

      for (let i = 1; i <= maxValue && i <= 5; i++) {
        let html = htmlPagingItem(i);
        $("#recomment_collection__paging .paging__list").append(html);
      }
      // TODO

      if (maxIndex > 7) {
        $("#recomment_collection__paging .paging__list").append(
          htmlPagingScroll()
        );

        setMaxValue2(maxIndex);

        $("#recomment_paging__scroll").attr({
          max: maxIndex - 1,
          min: middleValue + 1,
          value: middleValue + 1,
        });

        eventInput();
      }

      eventClickElement();
      $("#recomment_paging_al").hide();
    }
    eventClickArrow();
    $(".recomment_paging__btn").val([minValue]);
  }
  function htmlCard2(video, user, game) {
    let html = `<a href="html/watching.html?videoId=${
      video.videoId
    }" class="card">
    <div class="card__preview">
        <img class="card__pic" src="${video.background}"
            alt="">
    </div>

    <div class="card__body">
        <div class="card__title">${video.title}</div>
        <div class="card__user">
            <div class='card__ava ${user.confirm == true ? " confirm" : ""}'>
                <img class="card__pic"
                    src="${user.avata}" alt="">
                    <div class="totalTime">${video.totalTime}</div>
            </div>
            <div class="card__desc">
                <div class="card__man">${user.name}</div>
                <div class="card__game">${game.name}®</div>
            </div>
        </div>
    </div>

    <div class="card__foot">
        <div class="card__dateUpload">${video.publishedDate}</div>
        <div class="status">${video.viewers} Views</div>
    </div>
</a>`;
    $(".collection_recomment").append(html);
  }

  let check = true;
  async function getVideoCollections() {
    try {
      let res = await fetch(linkVideosAPI);
      return await res.json();
    } catch (error) {
      console.log(error);

      let color = "red";
      let linkIcon = '<ion-icon name="warning-outline"></ion-icon>';
      let title = "Load Video Collection Failed";
      let detail = "Link API Video Collection broken";
      let actions = ``;

      popupMessage(color, linkIcon, title, detail, actions);
    }
  }
  async function getListCards(videoCollections, indexPage) {
    let numVideoInAPI = videoCollections.length;
    let numberVideoInWeb = $(".collection_recomment .card").length;

    if (numberVideoInWeb == 0) {
      let maxValueTemp1 = numVideoInAPI / numberVideosInPage;
      let maxValueTemp2 = Math.floor(numVideoInAPI / numberVideosInPage);

      if (maxValueTemp1 - maxValueTemp2 > 0) {
        maxValue = maxValueTemp2 + 1;
      } else {
        maxValue = maxValueTemp1;
      }

      exportHtml(maxValue);
    }

    let indexPageInt = parseInt(indexPage) - 1;
    let startNum = indexPageInt * numberVideosInPage;
    let endNum = (indexPageInt + 1) * numberVideosInPage;

    if (endNum > numVideoInAPI) {
      endNum = numVideoInAPI;
    }

    let newVideosList = [];
    videoCollections.forEach((video, index) => {
      if (index >= startNum && index < endNum) {
        newVideosList.push(video);
      }
    });

    return newVideosList;
  }

  async function getListUsers() {
    try {
      let res = await fetch(linkUserAPI);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  async function getListGames() {
    try {
      let res = await fetch(linkGameAPI);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function renderCards(newVideosList) {
    let numberCardInList = newVideosList.length;
    let numberCardInListTemp = 0;

    if (numberCardInList < numberVideosInPage) {
      check = false;
      numberCardInListTemp = numberCardInList;
      for (let i = numberCardInList; i < numberVideosInPage; i++) {
        $(".collection_recomment .card").eq(i).css("display", "none");
      }
    } else if (numberCardInList == numberVideosInPage && check == false) {
      check = true;

      for (let i = numberCardInListTemp; i < numberVideosInPage; i++) {
        $(".collection_recomment .card").eq(i).css("display", "flex");
      }
    }

    let numCard = $(".collection_recomment .card").length;
    let users = await getListUsers();
    let games = await getListGames();

    newVideosList.forEach(
      await function (card, index) {
        let uD = card.userId;
        let gD = card.cateGameId;

        let user = users.find((user) => {
          return user.userId == uD;
        });
        let game = games.find((game) => {
          return game.gameId == gD;
        });

        if (numCard == 0) {
          htmlCard2(card, user, game);
        } else {
          changeInfoCard(card, user, game, index);
        }
      }
    );
  }

  function changeInfoCard(video, user, game, index) {
    $(".collection_recomment .card")
      .eq(index)
      .prop("href", `html/watching.html?videoId=${video.videoId}`);

    $(".collection_recomment .card__man").eq(index).text(user.name);
    $(".collection_recomment .card__game").eq(index).text(game.name);

    if (user.confirm == true) {
      $(".collection_recomment .card__ava").eq(index).addClass("confirm");
    } else {
      $(".collection_recomment .card__ava").eq(index).removeClass("confirm");
    }
    $(".collection_recomment .totalTime").eq(index).text(video.totalTime);
    $(".collection_recomment .card__title").eq(index).text(video.title);
    $(".collection_recomment .status").eq(index).text(video.viewers);
    $(".collection_recomment .card__dateUpload")
      .eq(index)
      .text(video.publishedDate);

    $(".collection_recomment .card__preview .card__pic")
      .eq(index)
      .prop("src", `${video.background}`);
    $(".collection_recomment .card__ava .card__pic")
      .eq(index)
      .prop("src", `${user.avata}`);
  }
  function renderTitleVideoCollection() {
    $("#recomment_collection .collection__title").text("Recomment Video");
  }
  async function renderVideosByIndexPage(indexPage) {
    let videoCollections = await getVideoCollections();

    let newCardsList = await getListCards(videoCollections, indexPage);

    await renderCards(newCardsList);
  }

  renderTitleVideoCollection();
  renderVideosByIndexPage(1);

  $(window).resize(function () {
    if ($(window).width() <= 601) {
      $("#recomment_collection__paging .paging__item").eq(2).hide();
      $("#recomment_collection__paging .paging__item").eq(3).hide();
      $("#recomment_collection__paging .paging__item").eq(4).hide();
      middleValue = 2;
      $("#recomment_paging__scroll").attr({
        value: middleValue + 1,
      });
    } else {
      $("#recomment_collection__paging .paging__item").eq(2).show();
      $("#recomment_collection__paging .paging__item").eq(3).show();
      $("#recomment_collection__paging .paging__item").eq(4).show();
      middleValue = 5;
      $("#recomment_paging__scroll").attr({
        value: middleValue + 1,
      });
    }
  });

  // Input Index
  function eventInput() {
    $("#recomment_paging__scroll").on("change", function () {
      let value = parseInt($("#recomment_paging__scroll").val());
      if (value < middleValue + 1 || value > maxValue - 1) {
        $("#recomment_mes_invalid").text(
          "Input number between 6 - " + (maxValue - 1)
        );
        $("#recomment_mes_invalid").show();
      } else {
        $("#recomment_mes_invalid").hide();
        renderVideosByIndexPage(value);
      }
      // hiddenBtn();
    });
  }

  function eventClickElement() {
    // click to each index
    $(".recomment_paging__btn").click(function () {
      let index = $("input[name='recomment_paging']:checked").val();
      $(".recomment__paging_index").removeClass("active");

      // console.log(index); // TODO get DB
      renderVideosByIndexPage(index);
      hiddenBtn();
    });
  }

  function eventClickArrow() {
    // click button left
    $("#recomment_paging_al").click(function downPageIndex() {
      let value = parseInt($(".recomment_paging__btn:checked").val());

      if (Number.isInteger(value) && value > 1) {
        let newValue = value - 1;

        if (value == maxValue && maxValue > 7) {
          $(".recomment_paging__btn").val([""]);
          $(".recomment__paging_index").addClass("active");
          $("#recomment_paging__scroll").val([newValue]);
          renderVideosByIndexPage(newValue);
        } else {
          $(".recomment_paging__btn").val([newValue]);
          renderVideosByIndexPage(newValue);
        }

        // console.log(newValue); // TODO get DB

        // TODO : get topics from DB with value are index Page
      } else if (Number.isNaN(value)) {
        // Value is NAN
        $(".recomment_paging__btn").val([""]);
        $(".recomment__paging_index").addClass("active");

        let newValue = parseInt($("#recomment_paging__scroll").val()) - 1;

        if (newValue > middleValue && newValue < maxValue) {
          $("#recomment_paging__scroll").val([newValue]);
          renderVideosByIndexPage(newValue);
        } else {
          $(".recomment_paging__btn").val([newValue]);
          $(".recomment__paging_index").removeClass("active");
          renderVideosByIndexPage(newValue);
        }

        // console.log(newValue); // TODO get DB
      }
      hiddenBtn();
    });

    // click button right
    $("#recomment_paging_ar").click(function upPageIndex() {
      let value = parseInt($(".recomment_paging__btn:checked").val()) + 1;

      if (Number.isInteger(value)) {
        if (value <= middleValue || value == maxValue) {
          $(".recomment_paging__btn").val([value]);
          renderVideosByIndexPage(value);
        } else if (value == middleValue + 1) {
          $(".recomment_paging__btn").val([""]);
          $(".recomment__paging_index").addClass("active");
          $("#recomment_paging__scroll").val([middleValue + 1]);
          renderVideosByIndexPage(value);
        }

        // console.log(value); // TODO get DB
      } else {
        // Value is NAN
        let newValue = parseInt($("#recomment_paging__scroll").val()) + 1;

        if (newValue > middleValue && newValue < maxValue) {
          $("#recomment_paging__scroll").val([newValue]);
          renderVideosByIndexPage(newValue);
        } else {
          $(".recomment_paging__btn").val([newValue]);
          $(".recomment__paging_index").removeClass("active");
          renderVideosByIndexPage(newValue);
        }

        // console.log(newValue); // TODO get DB
      }
      hiddenBtn();
    });
  }

  function hiddenBtn() {
    let newValue = parseInt($(".recomment_paging__btn:checked").val());
    if (newValue == minValue) {
      $("#recomment_paging_al").hide();
      $("#recomment_paging_ar").show();
    } else if (newValue == maxValue) {
      $("#recomment_paging_ar").hide();
      $("#recomment_paging_al").show();
    } else {
      $("#recomment_paging_al").show();
      $("#recomment_paging_ar").show();
    }
  }
});

// Show and Hide Stories
$(document).ready(function () {
  let numberStory = $(".stories__item").length;
  // let listStory = $(".stories__item");
  // let widthStory = $(".stories__list").width() / 3;
  // let widthListStory = numberStory * widthStory;
  // let movement = 0;

  let cf = false;

  let check;
  let check2;
  let check3;
  let check4;

  function createItem(number) {
    let itemStr = '<div class="stories__item scale">';

    // { Timeline
    itemStr += '<div class="stories__timelines">';
    let timelineTemp = "";
    for (let i = 0; i < number; i++) {
      timelineTemp +=
        '<div class="stories__timeline"><div class="stories__timeline_fill"></div></div>';
    }

    itemStr += timelineTemp;
    itemStr += "</div>";
    // }

    // { User
    itemStr += '<div class="stories__user">';

    let avaTemp =
      '<div class="stories__ava"><img src="https://ui8-unity-gaming.herokuapp.com/img/ava-1.png" alt=""></div>';
    itemStr += avaTemp;

    let desTemp =
      '<div class="stories__des"><div class="stories__name">Zao Lil</div><div class="stories__cate">Call of Duty</div></div>';
    itemStr += desTemp;

    itemStr += "</div>";
    // }

    // { Action
    itemStr += '<div class="stories__actions">';
    let actionTemp =
      '<div class="stories__react"><ion-icon name="magnet"></ion-icon></div>';
    actionTemp += '<div class="stories__emoticons">';

    let actionLike =
      '<div class="stories__emoticon stories__like"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e4299734559659.56d57de04bda4.gif" alt=""></div>';
    let actionTym =
      '<div class="stories__emoticon stories__tym"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/65ea2034559659.56d57de06cea2.gif" alt=""></div>';
    let actionHaha =
      '<div class="stories__emoticon stories__haha"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35c9bf34559659.56d57de0eb467.gif" alt=""></div>';
    let actionWow =
      '<div class="stories__emoticon stories__wow"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/6105c734559659.56d59c54f0d05.gif" alt=""></div>';
    let actionSad =
      '<div class="stories__emoticon stories__sad"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/3eee1d34559659.56d59de621daa.gif" alt=""></div>';
    let actionAngry =
      '<div class="stories__emoticon stories__angry"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e66e6e34559659.56d57de095aee.gif" alt=""></div>';

    let inputTemp =
      '<input class="stories__input" type="text" name="" placeholder="Send a message..."><div class="stories__btn_send button btn_purple" onclick = "sendMessStory();">Send</div>';

    actionTemp += actionLike;
    actionTemp += actionTym;
    actionTemp += actionHaha;
    actionTemp += actionWow;
    actionTemp += actionSad;
    actionTemp += actionAngry;
    actionTemp += "</div>";
    actionTemp += inputTemp;
    actionTemp += "</div>";

    itemStr += actionTemp;
    // }

    // { Child
    let childTemp = '<div class="stories__childs">';

    for (let i = 0; i < number; i++) {
      if (i == 0) {
        childTemp +=
          '<div class="stories__child active" style="background-image: url(https://ui8-unity-gaming.herokuapp.com/img/game-pic-';
        childTemp += Math.floor(Math.random() * 3 + 1);
        childTemp += '.png);"><img src="" alt=""></div>';
      } else {
        childTemp +=
          '<div class="stories__child" style="background-image: url(https://ui8-unity-gaming.herokuapp.com/img/card-pic-';
        childTemp += Math.floor(Math.random() * 3 + 1);
        childTemp += '.png);"><img src="" alt=""></div>';
      }
    }

    childTemp += "</div>";
    itemStr += childTemp;
    // }

    itemStr += "\n</div>";

    return itemStr;
  }

  // let item = createItem(3);
  // console.log(item);

  let arrStory = [];
  let indexActive = 3;

  for (let i = 0; i < 7; i++) {
    let newItem = createItem(Math.floor(Math.random() * 10 + 1));
    $(".stories__list").append(newItem);
    $(".stories__item").eq(i).removeClass("scale");
    $(".stories__item").eq(indexActive).addClass("active");
  }

  function nextStory() {
    let numberItemChild = Math.floor(Math.random() * 10 + 1);

    let promise = new Promise((resolve, reject) => {
      resolve();
    });

    promise
      .then(() => {
        let newItem = createItem(numberItemChild);
        $(".stories__list").append(newItem);
      })

      .then(() => {
        let listStory = $(".stories__item");

        listStory.removeClass("active center");
        listStory.eq(indexActive).addClass("active center");

        listStory.eq(0).addClass("scale");
      });

    // .then(() => {
    //   cf = true;
    // })

    // .then(() => {
    //   activeTimeLine(0);
    // });

    $(".stories__item:last-child").removeClass("scale");

    $(".stories__item").eq(0).remove();
  }

  function activeTimeLine(startIndex) {
    let timelineFill = $(".stories__item.active .stories__timeline_fill");
    let storyChild = $(".stories__item.active .stories__child");
    let numberTimelineFill = timelineFill.length;
    let numStoryChild = storyChild.length;
    let n = 0;

    if (numberTimelineFill == numStoryChild) {
      for (let i = startIndex; i <= numberTimelineFill; i++) {
        check3 = setTimeout(() => {
          if (cf == false) {
            clearTimeout(check3);
          } else {
            timelineFill.eq(i).addClass("active");

            if (i != startIndex) {
              storyChild.eq(i).addClass("active");
            }

            check4 = setTimeout(() => {
              if (cf == false) {
                clearTimeout(check4);
              } else {
                timelineFill.eq(i).removeClass("active");
                if (i != numberTimelineFill - 1) {
                  storyChild.eq(i).removeClass("active");
                }
              }
              // if (i == numberTimelineFill) {
              //   nextStory();
              // }
            }, 4980);
          }
        }, 5000 * i);
      }

      n = 5000 * numberTimelineFill;
    }

    return n;
  }

  function showStories() {
    clearTimeout(check);
    clearTimeout(check2);

    cf = false;

    let promise = Promise.resolve()

      .then(() => {
        return new Promise((resolve, reject) => {
          let numberChildItem = $(
            ".stories__item.active .stories__child"
          ).length;
          let indexItemChildActive =
            $(".stories__item.active .stories__child").index(
              $(".stories__item.active .stories__child.active")
            ) + 1;

          if (indexItemChildActive == numberChildItem) {
            resolve("nextStory"); // last index
          } else {
            resolve(indexItemChildActive);
          }
        });
      })

      .then((value) => {
        return new Promise((resolve, reject) => {
          clearTimeout(check3);
          clearTimeout(check4);
          nextStory();
          resolve();
          // if (value == "nextStory") {
          // } else {
          //   clearTimeout(check3);
          //   clearTimeout(check4);
          //   console.log("promist : " + value);
          // cf = true;
          // activeTimeLine(value);
          // }
        });
      })

      .then(() => {
        $(
          ".stories__item:nth-child(" + indexActive + ") .stories__child"
        ).addClass("active hidden");
        $(
          ".stories__item:nth-child(" +
            indexActive +
            ") .stories__child:last-child"
        ).removeClass("hidden");

        cf = true;
        run();
      })
      .catch(() => {});
  }

  function run() {
    if (cf == true) {
      let delayTime = activeTimeLine(0);

      check = setTimeout(nextStory, delayTime);

      delay = delayTime;

      check2 = setTimeout(run, delayTime + 100);
    }
  }

  run();

  $(".stories__btn_next").click(function () {
    showStories();
  });

  $(".stories__btn_prev").click(function () {});

  $(".header__stories").click(function () {
    $(".stories").addClass("active");
    $("html").css("overflow", "hidden");

    cf = true;

    showStories();

    if (window.scrollY >= 96) {
      console.log(top);
      $(".popup_icon").css("display", "none");
    }
  });

  $(".stories__bg, .stories__btn_close").click(function () {
    $(".stories").removeClass("active");
    $("html").css("overflow", "auto");

    if (window.scrollY >= 96) {
      console.log(top);
      $(".popup_icon").css("display", "flex");
    }
    cf = false;
  });
});

function sendMessStory() {
  let valueInput = $(".stories__item.active .stories__input").val();
  console.log(valueInput);

  if (!valueInput) {
    cf = false;
    let color = "yellow";
    let linkIcon = '<ion-icon name="alert-outline"></ion-icon>';
    let title = "Oops! Không ổn rồi";
    let detail = "Hãy nhập gì đó trước khi gửi nào brub";
    let actions = ``;

    popupMessage(color, linkIcon, title, detail, actions);
  } else {
    cf = true;

    let color = "green";
    let linkIcon = '<ion-icon name="checkmark-outline"></ion-icon>';
    let title = "Send Message Successfully";
    let detail = "Bạn quá là tuyệt vời luôn";
    let actions = ``;

    popupMessage(color, linkIcon, title, detail, actions);

    setTimeout(() => {
      $(".stories__item.active .stories__input").val("");
    }, 3000);
  }
}
function showReactbar() {
  console.log("sdgdsfsdfsdf");

  if ($(".stories__emoticons").css("display") == "none") {
    $(".stories__emoticons").css("display", "flex");
  } else {
    $(".stories__emoticons").css("display", "none");
  }
}
function reactStory(status, userName) {
  console.log("sdfgfgdfgdf");
  let mess = "Yeah!\nBạn đã " + status + "vào mặt " + userName;

  let color = "green";
  let linkIcon = '<ion-icon name="checkmark-outline"></ion-icon>';
  let title = "Send Amotion Successfully";
  let actions = ``;

  popupMessage(color, linkIcon, title, mess, actions);
}

// Delare Array Message Popup
let arrMess = [];
if (JSON.parse(localStorage.getItem("arrMess")) == null) {
  console.log("null");
} else {
  let arrMessTemp = JSON.parse(localStorage.getItem("arrMess"));
  for (const key in arrMessTemp) {
    arrMess.push(arrMessTemp[key]);
  }
}

// Popup Message Event
$(document).ready(() => {
  let promise = new Promise((resolve, reject) => {
    if (arrMess.length > 0) {
      $(".pm_note").hide();
    }
    for (const key in arrMess) {
      $(".pm__list").append(arrMess[key]);
    }
    resolve();
  });

  promise.then(() => {
    let listBtn = $(".pm__btn");

    $(".pm__list").on("click", ".pm__btn", function () {
      let index = $(this).index(".pm__btn");
      arrMess.splice(index, 1);

      $(".pm__item").eq(index).remove();

      if (arrMess.length > 0) {
        $(".pm_note").hide();
      } else {
        $(".pm_note").show();
      }

      localStorage.setItem("arrMess", JSON.stringify(arrMess));
    });
  });

  if ($(".pm__list .pm__item").length == 0) {
    $(".pm_note").show();
  }

  $(window).click((e) => {
    if (!e.target.closest(".popup__message, .pm__btn, .header__head")) {
      $(".popup__message").removeClass("active");

      $(".pm__arrow_undo").addClass("active");
      $(".pm__arrow_redo").removeClass("active");

      $(".header__body").hide();
    }
  });

  $(".pm__arrows").click(() => {
    $(".popup__message").toggleClass("active");

    $(".pm__arrow_undo").toggleClass("active");
    $(".pm__arrow_redo").toggleClass("active");

    $(".header__body").hide();
  });
});

function popupMessage(color, linkIcon, title, detail, actions) {
  let htmlItemPm = `<div class="pm__item">
                <div class="pm__container">
                  <div class="pm__icon ${color}">
                    ${linkIcon}
                  </div>
                
                  <div class="pm__content">
                    <div class="pm__title">${title}</div>
                    <div class="pm__detail">${detail}</div>
                    <div class="pm__detail pm__date">${new Date()
                      .toJSON()
                      .slice(0, 10)}</div>
                
                    <div class="pm__actions">
                      ${actions}
                    </div>
                  </div>

                  <div class="pm__btn">
                      <ion-icon name="close-outline"></ion-icon>
                  </div>
                </div>
              </div>
  `;

  let htmlMainPm = `
  <div class="pm__main active">

  <div class="pm__container">

      <div class="pm__icon ${color}">
      ${linkIcon}
      </div>

      <div class="pm__content">
      <div class="pm__title">${title}</div>
      <div class="pm__detail">${detail}</div>
      </div>

  </div>

</div>
  `;

  let promise = Promise.resolve();

  promise
    .then(() => {
      return new Promise((resolve, reject) => {
        $(".pm__list").before($(htmlMainPm));
        resolve();
      });
    })

    .then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          $(".pm_note").hide();

          let numItem = $(".pm__list .pm__item").length;

          if (numItem == 0 || typeof numItem == "undefined") {
            $(".pm__list").append(htmlItemPm);
          } else {
            $(".pm__item:first-child").before(htmlItemPm);
          }
          resolve();
        }, 5700);
      });
    })

    .then(() => {
      return new Promise((resolve, reject) => {
        $(".pm__list").scrollTop(0);
        arrMess.push(htmlItemPm);
        $(".pm__main").remove();
        resolve();
      });
    })

    .then(() => {
      return new Promise((resolve, reject) => {
        localStorage.setItem("arrMess", JSON.stringify(arrMess));
        resolve();
        reject();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
