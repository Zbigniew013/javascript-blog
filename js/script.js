'use strict'

// document.getElementById('test-button').addEventListener('click', function(){
//   console.log('Guzik został kliknięty');
// });

// document.getElementById('test-button').addEventListener('click', function(){
//   const links = document.querySelectorAll('.titles a');
//   console.log('links:', links);
// });

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');
// const titleClickHandler = function(event){
//   console.log('Link was clicked!');
//   console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

this.classList.add('active');

  // console.log('clickedElement:', clickedElement);
  // console.log('clickedElement (with plus): ' + clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = this.getAttribute("href");
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

}



/*  G E N E R A T E   T I T L E   L I N K S  */

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';

  function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
// console.log(titleList)

  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
// console.log(articles);

let html = '';

for (const article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log(articleTitle);

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log(linkHTML);

    /* insert link into titleList */

    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    // titleList.insertAdjacentHTML("beforeend", linkHTML);
    html = html + linkHTML;

    // console.log(html);
  }
  titleList.innerHTML = html;

}

generateTitleLinks();


const links = document.querySelectorAll('.titles a');
// console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}


function calculateTagsParams (tags) {
  const params = {max: 0, min: 999999};
for(let tag in tags){
  console.log(tag + ' is used ' + tags[tag] + ' times');
  params.max = Math.max(tags[tag], params.max);
  params.min = Math.min(tags[tag], params.min);
}
  return params;
}




/*  G E N E R A T E   T A G S  */

function calculateTagClass (count, params){
  const classNumber = Math.floor ( ( (count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);
  return '' + classNumber;
} 

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);

  /* START LOOP: for every article: */

  for (const article of articles) {

    /* find tags wrapper */

    const tagsWrapperLinks = article.querySelector(optArticleTagsSelector);
    // console.log(tagsWrapperLinks);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    // console.log(articleTags); 

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray); 

      /* START LOOP: for each tag */

          for(let tag of articleTagsArray){

          /* generate HTML of the link */
          const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
          // const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';
          // console.log(linkHTML)
 
          /* add generated code to HTML variable */
          html = html + linkHTML;

          /* [NEW] check if this link is NOT already in allTags */
          if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
          } else {
            allTags[tag]++;
          }

      /* END LOOP: for each tag */
        }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapperLinks.innerHTML = html;

  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);


  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

  /* [NEW] generate code of a link and add it to allTagsHTML */
  // allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';
  const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';
  console.log('tagLinkHTML:', tagLinkHTML);

  allTagsHTML += tagLinkHTML;

  }

  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTags();






  /*  a d d    a c t i o n    a f t e r    c l i c k    o n    t a g  */

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  
  const href = this.getAttribute("href");

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  // console.log(activeTagLinks);

    /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){

      /* remove class active */
      activeTagLink.classList.remove('active');
    
    /* END LOOP: for each active tag link */
    }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let targetTagLink of targetTagLinks){
      /* add class active */
      targetTagLink.classList.add('active');
      
    /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  const targetTagLinks = document.querySelectorAll('[href^="#tag-"]');
  // console.log(targetTagLinks);

    /* START LOOP: for each link */

      /* add tagClickHandler as event listener for that link */

      for(let targetTagLink of targetTagLinks){
      targetTagLink.addEventListener('click', tagClickHandler);
      };
    /* END LOOP: for each link */
}
addClickListenersToTags();



  /*   G E N E R A T E    A U T H O R S   */
  
  function generateAuthors(){

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';


    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    // console.log(articles);
  
    /* START LOOP: for every article: */
    for (let article of articles) {
  
      /* find tags wrapper */
      const authorsWrapperLinks = article.querySelector(optArticleAuthorSelector);
      // console.log(authorsWrapperLinks);
  
      /* make html variable with empty string */
      let html = '';
  
      /* get tags from data-tags attribute */
      const author = article.getAttribute("data-author");
      // console.log(authorsTags);
   
      /* generate HTML of the link */
      const linkHTML = '<p><a href="#author-' + author + '">' + author + '</a></p>';
      // console.log(linkHTML)
   
      /* add generated code to HTML variable */
      html = html + linkHTML;

      /* insert HTML of all the links into the tags wrapper */
      authorsWrapperLinks.innerHTML = html;
    
    /* END LOOP: for every article: */
    }
  }
  generateAuthors();


  
  /*  a d d    a c t i o n    a f t e r    c l i c k    o n    a u t h o r  */

  function authorClickHandler(event){

    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = this.getAttribute('href');
  
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
  
    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="author-"]');
    // console.log(activeAuthorLinks);

      /* START LOOP: for each active author link */
      for(let activeAuthorLink of activeAuthorLinks){
        /* remove class active */
      activeAuthorLink.classList.remove('active');
      
      /* END LOOP: for each active tag link */
      }
  
    /* find all author links with "href" attribute equal to the "href" constant */
    const targetAuthorLinks = document.querySelectorAll('a[href="' + href + '"]'); 

      /* START LOOP: for each found author link */
         for(let targetAuthorLink of targetAuthorLinks){
           
        /* add class active */
         targetAuthorLink.classList.add('active');
        
      /* END LOOP: for each found tag link */
      }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]'); 
  }
  
  function addClickListenersToAuthors(){
  
      const targetAuthorLinks = document.querySelectorAll('[href^="#author-"]');
      // console.log(targetAuthorLinks);

      /* START LOOP: for each link */
  
        /* add authorClickHandler as event listener for that link */
        for(let targetAuthorLink of targetAuthorLinks){
        targetAuthorLink.addEventListener('click', authorClickHandler);
        };
      /* END LOOP: for each link */
  }
  addClickListenersToAuthors();






