let currentSection = 'home';
let allStreams={
  bsc:['Physics','Chemistry','Zoology','Botany','Computer Science'],
  msc:['Physics','Chemistry','Mathematics','Biotechnology','Computer Science'],
  btech:['CSE','EE','ECE','ME','CE','AI'],
  mtech:['CSE','ECE','Mechanical','Civil','AI'],
  ba:['English','History','Political Science','Economics','Sociology'],
  ma:['English','History','Political Science','Economics','Sociology'],
  dpharma:['Pharmacology','Pharmaceutics','Pharmaceutical Chemistry','Pharmacognosy'],
  bpharma:['Pharmacology','Pharmaceutics','Pharmaceutical Chemistry','Pharmacognosy']
};

function showNavHeader(){
  document.querySelector('.nav-header').classList.remove('hidden');
}
function hideNavHeader(){
  document.querySelector('.nav-header').classList.add('hidden');
}
function showSearchBar(){
  document.querySelector('.search-bar').classList.remove('hidden');
}
function hideSearchBar(){
  document.querySelector('.search-bar').classList.add('hidden');
}

function goHome(){
  document.getElementById('courseGrid').style.display='grid';
  document.getElementById('streamSection').style.display='none';
  document.getElementById('bookSection').style.display='none';
  document.getElementById('backArrow').style.display='none';
  document.getElementById('searchInput').value='';
  showNavHeader();
  showSearchBar();
  currentSection = 'home';
  showAllCards('#courseGrid');
}

function showAllCards(gridId){
  let cards=document.querySelectorAll(gridId + ' article');
  cards.forEach(card=>{ card.style.display='block'; });
}

function openStreams(course){
  document.getElementById('courseGrid').style.display='none';
  document.getElementById('streamSection').style.display='block';
  document.getElementById('bookSection').style.display='none';
  document.getElementById('selectedCourse').innerText=course.toUpperCase() + ' Streams';
  document.getElementById('backArrow').style.display='flex';
  document.getElementById('searchInput').value='';
  hideNavHeader();
  hideSearchBar();
  currentSection = 'streams';
  let grid=document.getElementById('streamGrid');
  grid.innerHTML='';
  allStreams[course].forEach(s=>{
    grid.innerHTML+=`<article class='card' onclick="openBooks('${s}')"><img src='stream-placeholder.jpg' alt='${s}'><h3>${s}</h3></article>`;
  });
}

function openBooks(stream){
  document.getElementById('streamSection').style.display='none';
  document.getElementById('bookSection').style.display='block';
  document.getElementById('selectedStream').innerText=stream + ' Books';
  document.getElementById('backArrow').style.display='flex';
  document.getElementById('searchInput').value='';
  hideNavHeader();
  hideSearchBar();
  currentSection = 'books';
  let grid=document.getElementById('bookGrid');
  grid.innerHTML='';
  for(let i=1;i<=6;i++){
    grid.innerHTML+=`<article class='card'><img src='book-placeholder.jpg' alt='Book ${i}'><h3>${stream} Book ${i}</h3><a href='https://www.gutenberg.org/' target='_blank'>Read PDF</a></article>`;
  }
}

function goBack(){
  document.getElementById('searchInput').value='';
  if(currentSection==='books'){
    document.getElementById('bookSection').style.display='none';
    document.getElementById('streamSection').style.display='block';
    currentSection='streams';
    showAllCards('#streamGrid');
  } else if(currentSection==='streams'){
    document.getElementById('streamSection').style.display='none';
    document.getElementById('courseGrid').style.display='grid';
    document.getElementById('backArrow').style.display='none';
    showNavHeader();
    showSearchBar();
    currentSection='home';
    showAllCards('#courseGrid');
  } else if(currentSection==='search'){
    document.getElementById('bookSection').style.display='none';
    document.getElementById('courseGrid').style.display='grid';
    document.getElementById('backArrow').style.display='none';
    showNavHeader();
    showSearchBar();
    currentSection='home';
    showAllCards('#courseGrid');
  }
}

function filterItems(){
  let input=document.getElementById('searchInput').value.toLowerCase().trim();
  
  if(input === ''){
    if(currentSection === 'search'){
      goHome();
    } else {
      let gridId = currentSection === 'home' ? '#courseGrid' : 
                   currentSection === 'streams' ? '#streamGrid' : '#bookGrid';
      showAllCards(gridId);
    }
    return;
  }
  
  if(input.includes('book') || input.length > 3){
    searchAllBooks(input);
  } else {
    let gridId = currentSection === 'home' ? '#courseGrid' : 
                 currentSection === 'streams' ? '#streamGrid' : '#bookGrid';
    let cards = document.querySelectorAll(gridId + ' article');
    cards.forEach(card=>{
      let title = card.querySelector('h3').innerText.toLowerCase();
      card.style.display = title.includes(input) ? 'block' : 'none';
    });
  }
}

function searchAllBooks(query){
  document.getElementById('courseGrid').style.display='none';
  document.getElementById('streamSection').style.display='none';
  document.getElementById('bookSection').style.display='block';
  document.getElementById('selectedStream').innerText='Search Results';
  document.getElementById('backArrow').style.display='flex';
  hideNavHeader();
  currentSection = 'search';
  
  let grid = document.getElementById('bookGrid');
  grid.innerHTML = '';
  
  Object.keys(allStreams).forEach(course => {
    allStreams[course].forEach(stream => {
      for(let i=1; i<=6; i++){
        let bookName = stream + ' Book ' + i;
        if(bookName.toLowerCase().includes(query)){
          grid.innerHTML += `<article class='card'><img src='book-placeholder.jpg' alt='${bookName}'><h3>${bookName}</h3><a href='https://www.gutenberg.org/' target='_blank'>Read PDF</a></article>`;
        }
      }
    });
  });
  
  if(grid.innerHTML === ''){
    grid.innerHTML = '<p style="text-align:center;color:#666;">No books found matching your search.</p>';
  }
}
