"use strict";

$(document).ready(() => {
  //   let linkVideosAPI = "http://localhost:3000/videos";
  //   let linkUserAPI = "http://localhost:3000/users";
  //   let linkGameAPI = "http://localhost:3000/games";
  //   let counterIndex = 0;
  //   let numVideoInOnePage = 2;

  //
  //   async function getUserIdByUrl() {
  //     let url = new URL(document.URL);
  //     let search_params = url.searchParams;

  //     let uD = search_params.get("userId");
  //     return uD;
  //   }
  //   async function getListUsers() {
  //     try {
  //       let res = await fetch(linkUserAPI);
  //       return await res.json();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   async function getListGames() {
  //     try {
  //       let res = await fetch(linkGameAPI);
  //       return await res.json();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   function htmlVideo(video, game) {
  //     let html = `<div class="video video_line" >
  //         <div class="video__preview"
  //             style="background-image: url(${video.background});">

  //             <div class="video__time">${video.totalTime}</div>

  //             <div class="video__line">
  //                 <div class="video__process" style="width: 65%;"></div>
  //             </div>

  //         </div>

  //         <div class="video__details">
  //             <div class="video__title">${video.title}</div>

  //             <div class="video__status">
  //                 <div class="status video__views">${video.viewers} views</div>
  //                 <div class="status video__date">${video.publishedDate}</div>
  //             </div>

  //             <a href="html/playlist.html?gameId=${game.gameId}" class="game">
  //                 <div class="game__logo"><img
  //                         src="${game.gameThumbnail}"
  //                         alt="" class="game__pic"></div>
  //                 <div class="game__text">${game.name}®</div>
  //             </a>

  //             <div class="video__actions">
  //                 <a href="/watching.html?videoId=${video.videoId}" class="video__action">
  //                     <ion-icon name="eye-outline"></ion-icon>
  //                 </a>
  //                 <button class="video__action video__action_coopyLink" >
  //                     <ion-icon name="link-outline" class="abc" id="${video.videoId}"></ion-icon>
  //                 </button>
  //                 <button class="video__action">
  //                     <ion-icon name="share-social-outline"></ion-icon>
  //                 </button>
  //                 <button class="video__action">
  //                 <ion-icon name="ellipsis-vertical-outline"></ion-icon>
  //                 </button>

  //             </div>
  //         </div>
  //     </div>`;

  //     $(".catalog__list").append(html);
  //     eventCheckBox();
  //   }

  //   async function getVideoCollections() {
  //     try {
  //       let res = await fetch(linkVideosAPI);
  //       return await res.json();
  //     } catch (error) {
  //       console.log(error);

  //       let color = "red";
  //       let linkIcon = '<ion-icon name="warning-outline"></ion-icon>';
  //       let title = "Load Video Collection Failed";
  //       let detail = "Link API Video Collection broken";
  //       let actions = ``;

  //       popupMessage(color, linkIcon, title, detail, actions);
  //     }
  //   }
  //   async function getListCards(videoCollections, indexPage) {
  //     let uD = await getUserIdByUrl();

  //     let listVideos = videoCollections.filter((video) => {
  //       return video.userId == uD;
  //     });

  //     let numVideos = listVideos.length;

  //     $(".author__videos").text(`${numVideos} videos`);

  //     let startNum = indexPage * numVideoInOnePage;
  //     let endNum = (indexPage + 1) * numVideoInOnePage;

  //     let newListVideos = [];
  //     listVideos.forEach((video, index) => {
  //       if (index >= startNum && index < endNum) {
  //         newListVideos.push(video);
  //       }
  //     });

  //     return newListVideos;
  //   }
  //   async function renderCards(newVideosList) {
  //     let games = await getListGames();

  //     newVideosList.forEach(function (card, index) {
  //       let gD = card.cateGameId;

  //       let game = games.find((game) => {
  //         return game.gameId == gD;
  //       });

  //       htmlVideo(card, game);
  //     });
  //   }

  //   async function renderDetailChannel() {
  //     let users = await getListUsers();

  //     // Render Info This User
  //     let uD = await getUserIdByUrl();
  //     let user = users.find((user) => {
  //       return user.userId == uD;
  //     });

  //     $(".author__ava .ava__img").prop("src", `${user.avata}`);
  //     if (user.status == true) {
  //       $(".author__ava").addClass("active");
  //     }

  //     $(".author__name").text(user.name);
  //     if (user.confirm == true) {
  //       $(".author__name").addClass("confirm");
  //     }

  //     $(".author__followers").text(`${user.followers} followers`);

  //     // Get confirm Following

  //     let myId = 37;
  //     let myUser = users.find((user) => {
  //       return user.userId == myId;
  //     });

  //     let isFollowing = myUser.following.some((id) => {
  //       return id == uD;
  //     });

  //     if (isFollowing) {
  //       $(".action__follow.followed").addClass("active");
  //       $(".action__follow.unfollowed").removeClass("active");
  //     }
  //   }
  //   async function renderVideosByIndexPage(indexPage) {
  //     let videoCollections = await getVideoCollections();

  //     let newCardsList = await getListCards(videoCollections, indexPage);

  //     await renderCards(newCardsList);

  //     let uD = await getUserIdByUrl();
  //     let listVideos = videoCollections.filter((video) => {
  //       return video.userId == uD;
  //     });

  //     let numVideoInPage = $(".catalog__list .video").length;
  //     if (numVideoInPage == listVideos.length) {
  //       $(".catalog__btn_load").text("that's all");
  //       $(".catalog__btn_load").attr("disabled", true);
  //       $(".catalog__btn_load").addClass("off");
  //     }

  //     ++counterIndex;
  //   }

  //   renderVideosByIndexPage(0);
  //   renderDetailChannel();

  //   Event Click Catalog Link
  $(".catalog__nav").on("click", ".catalog__link", function (e) {
    let indexClick = $(this).index(".catalog__link");
    let currentIndex = $(".catalog__link").index(".catalog__link.active");

    if (indexClick != currentIndex) {
      $(".catalog__link").removeClass("active");
      $(".catalog__link").eq(indexClick).addClass("active");

      let widthItem = $(".catalog__tab")[0].scrollWidth / 4;
      let numScroll = widthItem * indexClick;
      $(".catalog__tab").animate({ scrollLeft: numScroll });
    }
  });

  $(window).resize(function () {
    let indexClick = $(".catalog__link").index($(".catalog__link.active"));
    let widthItem = $(".catalog__tab")[0].scrollWidth / 4;
    let numScroll = widthItem * indexClick;
    $(".catalog__tab").animate({ scrollLeft: numScroll }, 0);
  });
});

let handleUserInfo = (() => {
  let listVideos = [];
  let listMyVideos = [];
  let listGames = [];
  let listUsers = [];
  let listHtmls = [];
  let listPlaylists = [];

  let indexPage = 1;
  let numberVideosInPage = 8;

  let yourUserId;
  let myUserId = 37;
  let check = true;

  function getUserById(id) {
    let user = listUsers.find((userTemp) => {
      return userTemp.userId == id;
    });
    return user;
  }

  return {
    loadmore() {
      $(".catalog__btn_load").click(() => {
        this.renderVideo(indexPage);
      });
    },
    getVideosAPI() {
      let linkVideosAPI = "http://localhost:3000/videos";

      fetch(linkVideosAPI)
        .then((api) => {
          return api.json();
        })

        .then((videos) => {
          listVideos = [...videos];
          let uD = this.getUserIdByUrl();
          return videos.filter((video) => {
            return video.userId === uD;
          });
        })

        .then((videos) => {
          listMyVideos = [...videos];
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

    getUserIdByUrl() {
      let url = new URL(document.URL);
      let search_params = url.searchParams;

      let uD = search_params.get("userId");
      return parseInt(uD);
    },

    getListHtmls() {
      let htmlTemps = listMyVideos.map((video) => {
        let gD = video.cateGameId;
        let game = listGames.find((game) => {
          return game.gameId == gD;
        });

        let htmlTemp = `<div class="video video_line" >
            <div class="video__preview"
                style="background-image: url(${video.background});">
        
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
        
                <a href="/html/playlist.html?gameId=${game.gameId}" class="game" target="_blank">
                    <div class="game__logo"><img
                            src="${game.gameThumbnail}"
                            alt="" class="game__pic"></div>
                    <div class="game__text">${game.name}®</div>
                </a>
        
                <div class="video__actions">
                    <a href="/html/watching.html?videoId=${video.videoId}" class="video__action" target="_blank">
                        <ion-icon name="eye-outline"></ion-icon>
                    </a>
                    <button class="video__action action_copyLink" >
                        <ion-icon name="link-outline" class="abc" id="${video.videoId}"></ion-icon>
                    </button>
                    <button class="video__action" id="action__share" data-videoId=${video.videoId}>
                        <ion-icon name="share-social-outline"></ion-icon>
                    </button>
                    <button class="video__action" id="action__other" data-videoId=${video.videoId}>
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
      listMyVideos.push(video);
      // TODO : add DB
    },

    deleteVideo(index) {
      listMyVideos.splice(index, 1);
      // TODO : delete DB
    },

    renderVideo(index) {
      let indexInt = parseInt(index) - 1;
      let startNum = indexInt * numberVideosInPage;
      let endNum = (indexInt + 1) * numberVideosInPage;

      // let numVideo = $(".catalog__list .video").length;

      // if (numVideo == 0) {
      let a = listMyVideos.length;
      if (startNum < a) {
        let htmls = listHtmls.slice(startNum, endNum);

        $(".catalog__list").append(htmls.join(""));
      } else {
        $(".catalog__btn_load ").text("That's all");
        $(".catalog__btn_load ").addClass("off");
      }
      // } else {
      //   let newListVideos = listMyVideos.slice(startNum, endNum);
      //   let numberCardInList = newListVideos.length;
      //   let cards = $(".catalog__list .video");

      //   if (numberCardInList < numberVideosInPage) {
      //     check = false;

      //     for (let i = numberCardInList; i < numberVideosInPage; i++) {
      //       cards.eq(i).css("display", "none");
      //     }
      //   } else if (numberCardInList == numberVideosInPage && check == false) {
      //     check = true;

      //     for (let i = 0; i < numberVideosInPage; i++) {
      //       cards.eq(i).css("display", "flex");
      //     }
      //   }

      //   newListVideos.forEach((video, index) => {
      //     let gD = video.cateGameId;
      //     let gamee = listGames.find((game) => {
      //       return game.gameId == gD;
      //     });

      //     changeInfoCard(video, gamee, index);
      //   });

      //   indexPage = indexPage + 1;
      // }
      ++indexPage;
      videoClickEvent();
    },

    init() {
      Promise.all([
        this.getUserIdByUrl(),
        this.getVideosAPI(),
        this.getGamesAPI(),
        this.getUsersAPI(),
      ])

        .then((value) => {
          return new Promise((resolve, reject) => {
            yourUserId = value[0];
            setTimeout(() => {
              let user = getUserById(yourUserId);
              this.renderInfoUser(user);

              this.getListHtmls();
              resolve(user);
            }, 1000);
          });
        })
        .then((user) => {
          return new Promise((resolve, reject) => {
            this.renderAbout(user);
            this.renderFollowings(user);
            this.getPlaylistsAPI(user);

            this.renderVideo(indexPage);

            setTimeout(() => {
              this.renderPlaylists();
              resolve();
            }, 1000);
          });
        })

        .catch((err) => {
          console.log(err);
        });
    },

    getUsersAPI() {
      let linkUsersAPI = "http://localhost:3000/users";

      fetch(linkUsersAPI)
        .then((api) => {
          return api.json();
        })

        .then((users) => {
          listUsers = [...users];
        });
    },

    renderFollowings(user) {
      let myUserFollowing = getUserById(myUserId).following;

      let listFollowing = user.following.map((userIdTemp) => {
        let userTemp = listUsers.find((user) => {
          return user.userId == userIdTemp;
        });

        let isFollowing = myUserFollowing.some((value) => {
          return value == userIdTemp;
        });
        let htmlFollowingTemp = `<div class="following">
          <a href="/html/channelProfile.html?userId=${
            userTemp.userId
          }" class="following__ava" target="_blank"><img
                  src="${userTemp.avata}" alt=""
                  class="following__img"></a>
          <div class="following__name">${userTemp.name}</div>
          <div class="following__num">${userTemp.followers} follows</div>
          <div class="following__btn" data-isfollow="${isFollowing}" data-userId=${
          userTemp.userId
        }>${isFollowing == true ? "unfollow" : "follow"}</div>
          </div>`;

        let user = getUserById(yourUserId);

        return htmlFollowingTemp;
      });

      $(".following__item_fl .followings__bottom").append(
        listFollowing.join("")
      );
      this.eventFollow();
    },

    getPlaylistsAPI() {
      let linkPlaylistsAPI = "http://localhost:3000/playlists";

      fetch(linkPlaylistsAPI)
        .then((api) => {
          return api.json();
        })

        .then((playlists) => {
          let listPlaylistsTemp = playlists.filter((playlist) => {
            return playlist.userId == yourUserId;
          });
          listPlaylists = [...listPlaylistsTemp];
        });
    },

    getBgPlaylist(videoId) {
      let video = listVideos.find((video) => {
        return video.videoId == videoId;
      });

      return video.background;
    },

    renderPlaylists() {
      let htmlsPlaylist = listPlaylists.map((playlist, index) => {
        let numVideo = playlist.videoId.length;
        let videoId = playlist.videoId[0];

        let html = `<div class="playlists__item">
              <a href="/html/playlist.html?playlistId=${
                playlist.playlistId
              }" class="playlists_banner"
                  style="background-image: url(${this.getBgPlaylist(
                    videoId
                  )})" target="_blank">
                  <div class="playlist__detail">
                      <div class="playlists__numVideo">${numVideo}</div>
                      <div class="playlists__icon">
                          <ion-icon name="list-outline"></ion-icon>
                      </div>
                  </div>
      
              </a>
      
              <a href="/html/playlist.html?playlistId=${
                playlist.playlistId
              }" class="playlists__name" target="_blank">${playlist.name}</a>
              <div class="playlists__view">view full playlist</div>
          </div>`;

        return html;
      });

      $(".catalog__item_playlits .playlists__bottom").append(
        htmlsPlaylist.join("")
      );
    },

    renderAbout(user) {
      let html = `<div class="about__left">
          <div class="about__left_item">
              <div class="about__title">
                  Description
              </div>
              <div class="about__desc">${user.desc}</div>
          </div>
      </div>
      <div class="about__right">
          <div class="about__title">
              State
          </div>
          <div class="about__right_item">Joined ${user.joinDate}</div>
          <div class="about__right_item" data-userId=${user.userId}>
              <ion-icon name="flag-outline"></ion-icon>
          </div>
      </div>`;

      $(".catalog__item_about").append(html);
    },

    renderInfoUser(user) {
      let myUser = getUserById(myUserId);
      let followed = myUser.following.some((item) => {
        return item == yourUserId;
      });
      let html = `<div class="author__detail">
  
        <div class="author__ava ${user.status == true ? "active" : ""}">
            <img src="${user.avata}" alt="" class="ava__img">
        </div>
  
        <div class="author__info">
            <div class="author__name ${
              user.confirm == true ? "confirm" : ""
            }">${user.name}</div>
            <div class="author__parameters">
                <div class="author__parameter author__followers">${
                  user.followers
                } followers</div>
                <div class="author__parameter author__videos">${
                  listMyVideos.length
                } videos</div>
            </div>
        </div>
  
    </div>
    <div class="author__actions">
  
        <div class="author__action button btn_purple">
            <div class="author__action_item author__action_text">Message</div>
            <div class="author__action_item author__action_icon"><i class="fas fa-comment-dots"></i>
            
            </div>
        </div>
  
        <div class="author__action button btn_square ${
          followed == true ? "active" : ""
        }" id="btn__follow">
            <div class="action__follow unfollowed"><i class="fas fa-user-plus"></i></div>
            <div class="action__follow followed"><i class="fas fa-user-check"></i></div>
            <div class="unfollow_mess">
                        <div class="mess__title">Unfollowing from F8 Official?</div>
                        <div class="mess__btns">
                            <div class="mess__btn mess__cancel button ">cancel</div>
                            <div class="mess__btn mess__confirm button btn_purple">confirm</div>
                        </div>
                    </div>
        </div>
  
    </div>`;

      $(".page__center .author").append(html);
      actionClick();
    },
    eventFollow() {
      $(".following__btn").click(function (e) {
        let isFollow = this.dataset.isfollow;
        let userIdClick = this.dataset.userid;
        console.log(isFollow);

        if (isFollow == "true") {
          // un follow
          $(this).text("follow");
          this.setAttribute("data-isfollow", "false");

          let user = getUserById(yourUserId);
          let color = "yellow";
          let linkIcon = '<ion-icon name="alert-outline"></ion-icon>';
          let title = `Unfollowed Successfully`;
          let detail = `You have successfully unfollowed ${user.name}`;
          let actions = ``;

          popupMessage(color, linkIcon, title, detail, actions);
        } else {
          // follow
          console.log("aaa");
          $(this).text("unfollow");
          this.setAttribute("data-isfollow", "true");

          let user = getUserById(yourUserId);
          let color = "green";
          let linkIcon = '<ion-icon name="checkmark-outline"></ion-icon>';
          let title = `Follow Successfully`;
          let detail = `You have successfully followed ${user.name}`;
          let actions = ``;

          popupMessage(color, linkIcon, title, detail, actions);
        }
      });
    },
  };

  function videoClickEvent(ex) {
    $(".video").click((e) => {
      if (e.target.closest(".action_copyLink")) {
        let copyText = `/html/watching.html?videoId=${e.target.id}`;
        navigator.clipboard.writeText(copyText);

        let color = "green";
        let linkIcon = '<ion-icon name="checkmark-outline"></ion-icon>';
        let title = "Coop Successfuly";
        let detail = "Coopy Link Video Successfuly in Clipboard";
        let actions = ``;

        popupMessage(color, linkIcon, title, detail, actions);
      }
      //   else if (e.target.closest(".checkbox__item")) {

      //   }

      e.stopImmediatePropagation();
    });
  }

  function actionClick() {
    let btn_square = $(".btn_square");

    $(".author__action.btn_square").click((e) => {
      if (!e.target.closest(".mess__btn")) {
        if (btn_square.hasClass("active")) {
          $(".unfollow_mess").addClass("active");
        } else {
          btn_square.addClass("active");
          //   TODO add to db

          //   Message
          let user = getUserById(yourUserId);
          let color = "green";
          let linkIcon = '<ion-icon name="checkmark-outline"></ion-icon>';
          let title = `Follow ${user.name} Successfully`;
          let detail = "Bạn quá là tuyệt vời luôn";
          let actions = ``;

          popupMessage(color, linkIcon, title, detail, actions);
        }
      }
    });

    $(".mess__btn").click((e) => {
      $(".unfollow_mess").removeClass("active");

      if (e.target.closest(".mess__confirm")) {
        btn_square.removeClass("active");
        //   TODO add to db

        // Mess
        let user = getUserById(yourUserId);
        let color = "yellow";
        let title = `Unfollowed ${user.name} Successfully`;
        let linkIcon = '<ion-icon name="alert-outline"></ion-icon>';
        let detail = `You have successfully unfollowed ${user.name}`;
        let actions = ``;

        popupMessage(color, linkIcon, title, detail, actions);
      }
    });

    $(window).click((e) => {
      if (!e.target.closest(".unfollow_mess, .btn_square")) {
        $(".unfollow_mess").removeClass("active");
      }
    });
  }
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
})();

handleUserInfo.init();
handleUserInfo.loadmore();
