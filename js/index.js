$(function(){
  // 初始化数据
  var direction = {up:1,right:2,down:3,left:4};

  // 初始化两个坐标
  var now = {col:1,row:1};
  var last = {col:0,row:0};

  var isMoving = false;

  // 向上滑动
  $('.page').swipeUp(function(){
    if (isMoving){
      return;
    }
    last.col = now.col; 
    last.row = now.row; 
    if(last.col<5){
      now.col = last.col + 1;
      now.row = 1;
      movePage(direction.up);
    }
  })
  // 向下滑动
  $('.page').swipeDown(function () {
    if (isMoving) {
      return;
    }
    last.col = now.col;
    last.row = now.row;
    if (last.col >1){
      now.col = last.col - 1;
      now.row = 1;
      movePage(direction.down);
    }
  })
  // 向左滑动
  $('.page').swipeLeft(function () {
    if (isMoving) {
      return;
    }
    last.col = now.col;
    last.row = now.row;
    if (last.col > 1 && last.col < 5 && last.row == 1){
      now.col = last.col;
      now.row = last.row + 1;
      movePage(direction.left);
    }
  })

  // 向右滑动
  $('.page').swipeRight(function () {
    if (isMoving) {
      return;
    }
    last.col = now.col;
    last.row = now.row;
    if (last.col > 1 && last.col < 5 && last.row == 2){
      now.col = last.col;
      now.row = last.row - 1;
      movePage(direction.right);
    }
  })

  // 定义滑动的功能函数
  function movePage(dir){
    // 初始化参与动画的页面
    var lastPage = ".page-" + last.col + '-' + last.row;
    var nowPage = ".page-" + now.col + '-' + now.row;

    // 初始化两个动画类
    var inClass = '';
    var outClass = '';
    switch (dir) {
      case direction.up:
        outClass="page-moveToTop"
        inClass="page-moveFromBottom"
        break;
      case direction.right:
        outClass = "page-moveToRight"
        inClass = "page-moveFromLeft"
        break;
      case direction.down:
        outClass = "page-moveToBottom"
        inClass = "page-moveFromTop"
        break;
      case direction.left:
        outClass = "page-moveToLeft"
        inClass = "page-moveFromRight"
        break;
    }

    $(lastPage).addClass(outClass)
    $(nowPage).removeClass('hide')
    $(nowPage).addClass(inClass)
    isMoving = true

    // 动画执行完清除动画
    setTimeout(() => {
      $(lastPage).removeClass(outClass)
      $(lastPage).addClass('hide')
      $(lastPage).removeClass('current-page')
      $(lastPage).find('img').addClass('hide')

      $(nowPage).find('img').removeClass('hide')
      $(nowPage).removeClass(inClass)
      $(nowPage).addClass('current-page')
      isMoving = false
    }, 600);
  }
})