"use strict";

function eventCheckBox(ex) {
  $(".checkbox__all").change(function (e) {
    $(".video").toggleClass("active");
    $(".checkbox__item").prop("checked", this.checked);

    e.stopImmediatePropagation();
  });

  $(".video").click((e) => {
    if (e.target.closest(".video__action_coopyLink")) {
      let copyText = `html/watching.html?videoId=${e.target.id}`;
      navigator.clipboard.writeText(copyText);

      let color = "green";
      let linkIcon = '<ion-icon name="checkmark-outline"></ion-icon>';
      let title = "Coop Successfuly";
      let detail = "Coopy Link Video Successfuly in Clipboard";
      let actions = ``;

      popupMessage(color, linkIcon, title, detail, actions);
    } else if (e.target.closest(".checkbox__item")) {
      let numberCheckboxItem = $(".checkbox__item").length;
      var numberCheckboxChecked = $(
        "input:checkbox.checkbox__item:checked"
      ).length;

      if (numberCheckboxChecked == numberCheckboxItem) {
        $(".checkbox__all").prop("checked", true);
      } else {
        $(".checkbox__all").prop("checked", false);
      }
    }

    e.stopImmediatePropagation();
  });
}
// Select View
let jsCatalogListView = document.getElementsByClassName("list_view")[0];
let jsCatalogGridView = document.getElementsByClassName("grid_view")[0];
let jsCatalogView = document.getElementsByClassName("catalog__view");
let jsCatalog = document.getElementsByClassName("catalog")[0];

jsCatalogListView.addEventListener("click", function (e) {
  if (!jsCatalogListView.className.includes("active")) {
    jsCatalogListView.classList.add("active");
    jsCatalogGridView.classList.remove("active");

    jsCatalog.classList.add("view");
  }
});
jsCatalogGridView.addEventListener("click", function (e) {
  if (!jsCatalogGridView.className.includes("active")) {
    jsCatalogGridView.classList.add("active");
    jsCatalogListView.classList.remove("active");

    jsCatalog.classList.remove("view");
  }
});

//
$(window).resize(function () {
  if ($(window).width() < 1260) {
    if ($(".catalog").hasClass("view")) {
      $(".catalog").removeClass("view");
      jsCatalogGridView.classList.add("active");
      jsCatalogListView.classList.remove("active");
    }
  }
});

$(window).resize(() => {
  handleVideo.eventWindowResize();
});

let handleVideo = (() => {
  let listVideos = [];
  let listGames = [];
  let listHtmls = [];
  let myUserId = 37;
  let check = true;

  let numberVideosInPage = 8;
  let minValue = 1;
  let middleValue = 5;
  let maxValue = 0;

  let linkVideosAPI = "http://localhost:3000/videos";

  return {
    eventWindowResize() {
      if ($(window).width() <= 601) {
        $("#video_collection__paging .paging__item").eq(2).hide();
        $("#video_collection__paging .paging__item").eq(3).hide();
        $("#video_collection__paging .paging__item").eq(4).hide();
        middleValue = 2;
        $("#video_paging__scroll").attr({
          value: middleValue + 1,
        });
      } else {
        $("#video_collection__paging .paging__item").eq(2).show();
        $("#video_collection__paging .paging__item").eq(3).show();
        $("#video_collection__paging .paging__item").eq(4).show();
        middleValue = 5;
        $("#video_paging__scroll").attr({
          value: middleValue + 1,
        });
      }
    },
    eventInput() {
      $("#video_paging__scroll").on("change", () => {
        let value = parseInt($("#video_paging__scroll").val());
        if (value < middleValue + 1 || value > maxValue - 1) {
          $("#video_mes_invalid").text(
            "Input number between 6 - " + (maxValue - 1)
          );
          $("#video_mes_invalid").show();
        } else {
          $("#video_mes_invalid").hide();
          console.log(this);
          this.renderVideo(value);
        }
        // hiddenBtn();
      });
    },

    eventClickElement() {
      // click to each index
      $(".video_paging__btn").click(() => {
        let index = $("input[name='video_paging']:checked").val();
        $(".video__paging_index").removeClass("active");

        // console.log(index); // TODO get DB
        this.renderVideo(index);
        hiddenBtn();
      });
    },

    eventClickArrow() {
      // click button left
      $("#video_paging_al").click(() => {
        let value = parseInt($(".video_paging__btn:checked").val());

        if (Number.isInteger(value) && value > 1) {
          let newValue = value - 1;

          if (value == maxValue && maxValue > 7) {
            $(".video_paging__btn").val([""]);
            $(".video__paging_index").addClass("active");
            $("#video_paging__scroll").val([newValue]);
            console.log(this);
            this.renderVideo(newValue);
          } else {
            $(".video_paging__btn").val([newValue]);
            this.renderVideo(newValue);
          }

          // console.log(newValue); // TODO get DB

          // TODO : get topics from DB with value are index Page
        } else if (Number.isNaN(value)) {
          // Value is NAN
          $(".video_paging__btn").val([""]);
          $(".video__paging_index").addClass("active");

          let newValue = parseInt($("#video_paging__scroll").val()) - 1;

          if (newValue > middleValue && newValue < maxValue) {
            $("#video_paging__scroll").val([newValue]);
            console.log(this);

            this.renderVideo(newValue);
          } else {
            $(".video_paging__btn").val([newValue]);
            $(".video__paging_index").removeClass("active");
            this.renderVideo(newValue);
          }

          // console.log(newValue); // TODO get DB
        }
        hiddenBtn();
      });

      // click button right
      $("#video_paging_ar").click(() => {
        let value = parseInt($(".video_paging__btn:checked").val()) + 1;

        if (Number.isInteger(value)) {
          if (value <= middleValue || value == maxValue) {
            $(".video_paging__btn").val([value]);
            this.renderVideo(value);
          } else if (value == middleValue + 1) {
            $(".video_paging__btn").val([""]);
            $(".video__paging_index").addClass("active");
            $("#video_paging__scroll").val([middleValue + 1]);
            this.renderVideo(value);
          }

          // console.log(value); // TODO get DB
        } else {
          // Value is NAN
          let newValue = parseInt($("#video_paging__scroll").val()) + 1;

          if (newValue > middleValue && newValue < maxValue) {
            $("#video_paging__scroll").val([newValue]);
            this.renderVideo(newValue);
          } else {
            $(".video_paging__btn").val([newValue]);
            $(".video__paging_index").removeClass("active");
            this.renderVideo(newValue);
          }

          // console.log(newValue); // TODO get DB
        }
        hiddenBtn();
      });
    },

    exportHtmlPaging(maxIndex) {
      if (maxIndex == 0) {
        $("#video_collection__paging").hide();
      } else if (maxIndex == 1) {
        let html = htmlPagingItem(1);
        $("#video_collection__paging .paging__list").append(html);
      } else {
        $("#video_collection__paging .paging__list").append(htmlPagingArrow());

        for (let i = 1; i <= maxValue && i <= 5; i++) {
          let html = htmlPagingItem(i);
          $("#video_collection__paging .paging__list").append(html);
        }
        // TODO

        if (maxIndex > 7) {
          $("#video_collection__paging .paging__list").append(
            htmlPagingScroll()
          );

          setMaxValue2(maxIndex);

          $("#video_paging__scroll").attr({
            max: maxIndex - 1,
            min: middleValue + 1,
            value: middleValue + 1,
          });

          this.eventInput();
        }

        this.eventClickElement();
        $("#video_paging_al").hide();
      }
      this.eventClickArrow();
      $(".video_paging__btn").val([minValue]);
    },
    getVideosAPI() {
      fetch(linkVideosAPI)
        .then((api) => {
          return api.json();
        })

        .then((videos) => {
          return videos.filter((video) => {
            return video.userId === myUserId;
          });
        })

        .then((videos) => {
          listVideos = [...videos];
        });
    },

    getGamesAPI() {
      let linkGamesAPI = "http://localhost:3000/games";

      fetch(linkGamesAPI)
        .then((api) => {
          return api.json();
        })

        .then((games) => {
          listGames = [...games];
        });
    },

    getListHtmls() {
      let htmlTemps = listVideos.map((video) => {
        let gD = video.cateGameId;
        let game = listGames.find((game) => {
          return game.gameId == gD;
        });

        let htmlTemp = `<div class="video video_line" >
          <div class="video__preview"
              style="background-image: url(${video.background});">
      
              <label class="checkbox">
                  <input type="checkbox" name="radio" data-idVideo=${video.videoId}
                      class="checkbox__input checkbox__item">
                  <span class="checkmark"></span>
              </label>
      
              <div class="video__time">${video.totalTime}</div>
      
              <div class="video__line">
                  <div class="video__process" style="width: 65%;"></div>
              </div>
      
          </div>
      
          <div class="video__details">
              <div class="video__title">${video.title}</div>
      
              <div class="video__status">
                  <div class="status video__views">${video.viewers} views</div>
                  <div class="status video__date">${video.publishedDate}</div>
              </div>
      
              <a href="html/playlist.html?gameId=${game.gameId}" class="game">
                  <div class="game__logo"><img
                          src="${game.gameThumbnail}"
                          alt="" class="game__pic"></div>
                  <div class="game__text">${game.name}®</div>
              </a>
      
              <div class="video__actions">
                  <a href="html/watching.html?videoId=${video.videoId}" class="video__action">
                      <ion-icon name="eye-outline"></ion-icon>
                  </a>
                  <button class="video__action video__action_coopyLink" >
                      <ion-icon name="link-outline" class="abc" id="${video.videoId}"></ion-icon>
                  </button>
                  <button class="video__action">
                      <ion-icon name="share-social-outline"></ion-icon>
                  </button>
                  <button class="video__action">
                  <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                  </button>
      
              </div>
          </div>
              </div>`;

        return htmlTemp;
      });

      listHtmls = [...htmlTemps];
    },

    addVideo(video) {
      listVideos.push(video);
      // TODO : add DB
    },

    // deleteVideo(index) {
    //   listVideos.splice(index, 1);
    //   // TODO : delete DB
    // },

    renderPaging() {
      let numVideoInAPI = listVideos.length;
      $(".catalog__title").text(`You uploaded ${numVideoInAPI} videos`);
      let numberVideoInWeb = $(".catalog__list .video").length;

      if (numberVideoInWeb == 0) {
        let maxValueTemp1 = numVideoInAPI / numberVideosInPage;
        let maxValueTemp2 = Math.floor(numVideoInAPI / numberVideosInPage);

        if (maxValueTemp1 - maxValueTemp2 > 0) {
          maxValue = maxValueTemp2 + 1;
        } else {
          maxValue = maxValueTemp1;
        }

        this.exportHtmlPaging(maxValue);
      }
    },

    renderVideo(indexPage) {
      let indexPageInt = parseInt(indexPage) - 1;
      let startNum = indexPageInt * numberVideosInPage;
      let endNum = (indexPageInt + 1) * numberVideosInPage;

      let numVideo = $(".catalog__list .video").length;

      if (numVideo == 0) {
        let htmls = listHtmls.slice(startNum, endNum);

        $(".catalog__list").append(htmls.join(""));
      } else {
        let newListVideos = listVideos.slice(startNum, endNum);
        let numberCardInList = newListVideos.length;
        let cards = $(".catalog__list .video");

        if (numberCardInList < numberVideosInPage) {
          check = false;

          for (let i = numberCardInList; i < numberVideosInPage; i++) {
            cards.eq(i).css("display", "none");
          }
        } else if (numberCardInList == numberVideosInPage && check == false) {
          check = true;

          for (let i = 0; i < numberVideosInPage; i++) {
            cards.eq(i).css("display", "flex");
          }
        }

        newListVideos.forEach((video, index) => {
          let gD = video.cateGameId;
          let gamee = listGames.find((game) => {
            return game.gameId == gD;
          });
          console.log(gamee);

          changeInfoCard(video, gamee, index);
        });
      }
    },

    init() {
      Promise.all([this.getVideosAPI(), this.getGamesAPI()])

        .then(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.getListHtmls();
              resolve();
            }, 1000);
          });
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            this.renderPaging();
            this.renderVideo(1);
            eventCheckBox();
            this.handleVideo();

            resolve();
          });
        })

        .catch((err) => {
          console.log(err);
        });
    },
    deleteVideo(id, callback) {
      var options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(linkVideosAPI + "/" + id, options)
        .then((response) => {
          return response.json();
        })

        .then(callback);
    },
    handleVideo() {
      let that = this;
      $(".catalog__action_btn.delete").click(() => {
        $(".checkbox__item:checkbox:checked").each(function () {
          let id = $(this).attr("data-idvideo");
          console.log(id);
          that.deleteVideo(id);
        });
      });
    },
  };

  function changeInfoCard(video, game, index) {
    let vVideo = $(".catalog__list .video").eq(index);
    let gText = $(".catalog__list .game__text").eq(index);
    let gLogo = $(".catalog__list .game__logo .game__pic").eq(index);
    let vTime = $(".catalog__list .video__time").eq(index);
    let vTitle = $(".catalog__list .video__title").eq(index);
    let vViews = $(".catalog__list .video__views").eq(index);
    let vDate = $(".catalog__list .video__date").eq(index);
    let vPreview = $(".catalog__list .video__preview").eq(index);

    vVideo.prop("href", `html/watching.html?videoId=${video.videoId}`);

    gText.text(game.name);
    gLogo.prop("src", game.gameThumbnail);

    vTime.text(video.totalTime);
    vTitle.text(video.title);
    vViews.text(video.viewers);
    vDate.text(video.publishedDate);
    vPreview.css("background-image", "url(" + video.background + ")");
  }
  function htmlPagingItem(value) {
    return `<li class="paging__item">
  <input type="radio" id="video_paging__btn"
        class="paging__btn video_paging__btn"
        name="video_paging" value="${value}">
  <div class="paging__child">${value}</div>
  </li>`;
  }

  function htmlPagingArrow() {
    return `<li class="paging__arrow paging__arrow_left" id="video_paging_al">
            <ion-icon class="paging__icon" name="chevron-back"></ion-icon>
          </li>

          <li class="paging__arrow paging__arrow_right" id="video_paging_ar">
             <ion-icon class="paging__icon" name="chevron-forward"></ion-icon>
          </li>`;
  }

  function htmlPagingScroll() {
    return `<li class="paging__item video__paging_index">
                <div class="paging__dot">...</div>
                <input type="number" name="video__paging_scroll" id="video_paging__scroll"
                class="paging__scroll">
                <div class="mes_invalid" id="video_mes_invalid">Input invalid</div>
              </li>`;
  }

  function setMaxValue2(value) {
    let html = htmlPagingItem(value);
    $("#video_collection__paging .paging__list").append(html);

    $("#video_collection__paging .paging__child.last-child").text(value);
    $(".video_paging__btn.input_last_child").attr({
      value: value,
    });
  }

  function hiddenBtn() {
    let newValue = parseInt($(".video_paging__btn:checked").val());
    if (newValue == minValue) {
      $("#video_paging_al").hide();
      $("#video_paging_ar").show();
    } else if (newValue == maxValue) {
      $("#video_paging_ar").hide();
      $("#video_paging_al").show();
    } else {
      $("#video_paging_al").show();
      $("#video_paging_ar").show();
    }
  }
})();

handleVideo.init();
