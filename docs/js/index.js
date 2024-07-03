const hiddenElementsx= document.querySelectorAll('.hiddenx');
const observer=new IntersectionObserver(entries=>{
    entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }else{
                entry.target.classList.remove('show');
            }
    });
});
hiddenElementsx.forEach((el)=>observer.observe(el))



const hiddenElementsy= document.querySelectorAll('.hiddeny')
const observering=new IntersectionObserver(entries=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
});
});
hiddenElementsy.forEach((el)=>observer.observe(el))




const navtoggler=document.getElementById('nav-toggler');
const navdrop=document.getElementById('nav-drop');

const navItems=`
<li onclick="toggle()"><a href="./index.html">Home</a></li>
<li onclick="toggle()"><a href="./AboutMe.html">About</a></li>
<li onclick="toggle()"><a href="./Projects.html">Projects</a></li>
<li onclick="toggle()"><a href="./Services.html">Services</a></li>
<li onclick="toggle()"><a href="./ContactMe.html">Contact</a></li>`

function toggle() {
    const isOpen=navdrop.style.display==='block';
    navdrop.innerHTML= isOpen ? '': navItems;
    navdrop.style.display=isOpen ? 'none': 'block';
    navtoggler.innerHTML=isOpen ? '<i class="fas fa-bars"></i>': '<i class="fa-solid fa-x"></i>';
}

navtoggler.addEventListener('click', toggle)


function submitForm(e){

    e.preventDefault();
    const name = document.getElementById('client_name').value;
    const email = document.getElementById('client_email').value;
    const message = document.getElementById('client_message').value;

    const formData={
        name,
        email,
        message
    }   

    fetch('https://portfolio-server-one-coral.vercel.app/formdata', {
        method:'POST',
        headers:{
            'Content-Type': "Application/json"
        },
        body: JSON.stringify(formData)
    }).then((response)=>response.json())
    .then((data)=>{
        alert('Message successfully sent');
        document.getElementById('contactForm').reset();
    })
    .catch(err=>{
        console.log('error occured while trying to send message')
        alert("Error while sending Message pls try again later");
    })
}

document.getElementById('contactForm').addEventListener('submit', submitForm)
