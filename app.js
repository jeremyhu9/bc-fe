$(document).ready(function(){
  //TODO: Create components for books and book form

  // When books are read and entered, this object will keep track like a database
  var booksEntered = {};
  var toggled = false;

  var formTemplate = "<form id=book-entry>Book Title: <input name=book-title type=text><br>Author: <input name=book-author type=text><br>Picture Url: <input name=book-pic type=text><br><button class=entry-btn type=button>Submit</button></form>";
  
  // Event handler when user clicks yes
  // Form should display in current card
  $('.yes').on('click', function(){
    $('.top').empty();
    $('.top').append(formTemplate);

  });

  $('.no').on('click', function(){
    //Welcome message would be the first div appended in book-container
    $('.book-container').find('div:first').remove();
  });

  $('.book-container').on('click', 'button', function(){
    var bookInfo = {};
    var title = $("input[name='book-title']").val();
    var author = $("input[name='book-author']").val();
    var pic = $("input[name='book-pic']").val();

    //TODO: If pic is invalid format then use placeholder image

    //Package into object and send to bookCard to check for duplicate entry and post
    bookInfo.title = title;
    bookInfo.author = author;
    bookInfo.imgUrl = pic;
    bookCard(bookInfo);

    // Clear after book is entered
    $("input[name='book-title']").val('');
    $("input[name='book-author']").val('');
  });

  // Toggle menu in mobile screen
  $('.menu-trigger').on('click', function(){
    if (!toggled) {
      $('#lightbox').css('display', 'block');
      $('.menu-pic').attr('src', 'menu_close.svg');
      toggled = true;
    } else {
      $('#lightbox').css('display', '');
      $('.menu-pic').attr('src', 'menu_open.svg');
      toggled = false;
    }

    $('.nav').slideToggle();
  });

  // Generates a card that has book title, author, and image
  var bookCard = function(book) {
    var outline = $('<div class="book-card">');
    var top = $('<div class="card-top">');
    var bottom = $('<div class="card-bottom">');

    top.append('<h1>' + book.title +'</h1>');
    top.append('<p>' + 'By ' + book.author + '</p>');

    bottom.append('<a class="sample">FREE SAMPLE</a>');
    bottom.append('<a class="review">Review</a>');

    outline.append('<div class="img-placeholder"><img src=' + book.imgUrl + '></div>');
    outline.append(top);
    outline.append(bottom);

    // Append only if book is entered
    if (!booksEntered[book.title]) {
      $('.book-container').append(outline);

      booksEntered[book.title] = true;

      // Append book title to main menu row
      $('.nav ul').append('<li><a href="#">' + book.title + '</a></li>')
    }  

  }
  
  var book1 = {title: "El Pooch", author: "Alex Nelson", imgUrl: "http://placehold.it/150x300"};
  var book2 = {title: "The Flight", author: "Scott Masterson", imgUrl: "http://placehold.it/150x300"};
  
  bookCard(book1);
  bookCard(book2);
  
})