var sliderData = init_slider;
  var sliderIndex = 0;
  function compare(index) {
    if (index >= sliderData.length) {
      index = index - sliderData.length;
    }
    if (index < 0) {
      index = index + sliderData.length;
    }        
    return index;
  }
  function showSlider(direction) {
    sliderIndex = compare(sliderIndex)
    var index1 = compare(sliderIndex - 1);
    var index2 = sliderIndex;
    var index3 = compare(sliderIndex + 1);
    var index4 = compare(sliderIndex + 2);
    var index5 = compare(sliderIndex + 3);
    for (var i = 0; i < sliderData.length; i++) {
      if (i == index1) {
        jQuery(".testimonials-carousel-slider-image1")[index1].style.visibility = "visible";
        jQuery(".testimonials-carousel-slider-image1")[index1].style.transform = "translateX(-50%)";
        jQuery(".testimonials-carousel-slider-image1")[index1].style.zIndex = 0;
      } else if (i == index2) {
        jQuery(".testimonials-carousel-slider-image1")[index2].style.visibility = "visible";
        jQuery(".testimonials-carousel-slider-image1")[index2].style.transform = "translateX(0px)";
        jQuery(".testimonials-carousel-slider-image1")[index2].style.zIndex = 10;
      } else if (i == index3) {
        if (direction == "right") {
          jQuery(".testimonials-carousel-slider-image1")[index3].style.visibility = "hidden";
        } else if (direction == "left") {
          jQuery(".testimonials-carousel-slider-image1")[index3].style.visibility = "visible";
        }
        jQuery(".testimonials-carousel-slider-image1")[index3].style.transform = "translateX(100%)";
        jQuery(".testimonials-carousel-slider-image1")[index3].style.zIndex = 20;
      } else {
        jQuery(".testimonials-carousel-slider-image1")[i].style.visibility = "hidden";
        jQuery(".testimonials-carousel-slider-image1")[i].style.transform = "";
        jQuery(".testimonials-carousel-slider-image1")[i].style.zIndex = 20;
      }
      if (i == index2) {
        jQuery(".testimonials-carousel-slider-image2")[index2].style.visibility = "visible";
        jQuery(".testimonials-carousel-slider-image2")[index2].style.transform = "translateX(-50%)";
        jQuery(".testimonials-carousel-slider-image2")[index2].style.zIndex = 0;
      } else if (i == index3) {
        jQuery(".testimonials-carousel-slider-image2")[index3].style.visibility = "visible";
        jQuery(".testimonials-carousel-slider-image2")[index3].style.transform = "translateX(0px)";
        jQuery(".testimonials-carousel-slider-image2")[index3].style.zIndex = 10;
      } else if (i == index4) {
        if (direction == "right") {
          jQuery(".testimonials-carousel-slider-image2")[index4].style.visibility = "hidden";
        } else if (direction == "left") {
          jQuery(".testimonials-carousel-slider-image2")[index4].style.visibility = "visible";
        }
        jQuery(".testimonials-carousel-slider-image2")[index4].style.transform = "translateX(100%)";
        jQuery(".testimonials-carousel-slider-image2")[index4].style.zIndex = 20;
      } else {
        jQuery(".testimonials-carousel-slider-image2")[i].style.visibility = "hidden";
        jQuery(".testimonials-carousel-slider-image2")[i].style.transform = "";
        jQuery(".testimonials-carousel-slider-image2")[i].style.zIndex = 20;
      }
      if (i == index3) {
        jQuery(".testimonials-carousel-slider-image3")[index3].style.visibility = "visible";
        jQuery(".testimonials-carousel-slider-image3")[index3].style.transform = "translateX(-50%)";
        jQuery(".testimonials-carousel-slider-image3")[index3].style.zIndex = 0;
      } else if (i == index4) {
        jQuery(".testimonials-carousel-slider-image3")[index4].style.visibility = "visible";
        jQuery(".testimonials-carousel-slider-image3")[index4].style.transform = "translateX(0px)";
        jQuery(".testimonials-carousel-slider-image3")[index4].style.zIndex = 10;
      } else if (i == index5) {
        if (direction == "right") {
          jQuery(".testimonials-carousel-slider-image3")[index5].style.visibility = "hidden";
        } else if (direction == "left") {
          jQuery(".testimonials-carousel-slider-image3")[index5].style.visibility = "visible";
        }
        jQuery(".testimonials-carousel-slider-image3")[index5].style.transform = "translateX(100%)";
        jQuery(".testimonials-carousel-slider-image3")[index5].style.zIndex = 20;
      } else {
        jQuery(".testimonials-carousel-slider-image3")[i].style.visibility = "hidden";
        jQuery(".testimonials-carousel-slider-image3")[i].style.transform = "translateX(100%)";
        jQuery(".testimonials-carousel-slider-image3")[i].style.zIndex = 20;
      }
    }
    var carouselTextContent = 
      "<h1>" + 
        "“<span>" + 
          sliderData[sliderIndex].title + 
        "</span>”" + 
      "</h1>" + 
      sliderData[sliderIndex].description;
    jQuery(".testimonials-carousel-text-container").html(carouselTextContent);
    jQuery(".testimonials-carousel-animate-mobile").html(sliderData[sliderIndex].description);
  }
  function handleLeft() {
    sliderIndex--;
    showSlider("left")
  }
  function handleRight() {
    sliderIndex++;
    showSlider("right")
  }
  jQuery(document).ready(function() {
    for (var i = 0;i < sliderData.length; i++) {
      jQuery(".testimonials-carousel-slider1").append("<div class='testimonials-carousel-slider-image1 testimonials-carousel-slider-image-content'><img src='" + sliderData[i].image +"' alt=''/></div>");
      jQuery(".testimonials-carousel-slider2").append("<div class='testimonials-carousel-slider-image2 testimonials-carousel-slider-image-content'><img src='" + sliderData[i].image +"' alt=''/></div>");
      jQuery(".testimonials-carousel-slider3").append("<div class='testimonials-carousel-slider-image3 testimonials-carousel-slider-image-content'><img src='" + sliderData[i].image +"' alt=''/></div>");
    }
    showSlider();
  });