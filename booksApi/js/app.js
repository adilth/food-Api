// const url = "https://openlibrary.org/works/OL45883W.json";
document.querySelector("button").addEventListener("click", getFetch);
let getIsbn;

function getFetch() {
  let choice = document.querySelector("input").value;
  const urlName = `https://rest.bandsintown.com/artists/${choice}?app_id=510`;
  fetch(urlName)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      // console.log( data.docs[0].isbn);
      //remove all
      const removeList = document.querySelectorAll("li");
      for (const element of removeList) {
        element.remove;
      }
      for (let i = 0; i < data.links.length; i++) {
        let linksName = data.links[i];
        console.log(linksName);

        Object.values(linksName).forEach((val, indx) => {
          //create the list
          // console.log(val);
          // console.log(indx);
          let ul = document.querySelector(".links");
          let li = document.createElement("li");
          let a = document.createElement("a");
          li.appendChild(a);
          if (indx % 2 != 0) {
            a.href = val;
          }
          a.appendChild(document.createTextNode(val));

          ul.appendChild(li);
        });
      }

      // let keyIng = `links${linksC}`;
      // linksC++;

      document.querySelector("p.name").innerHTML = data.name;
      document.querySelector("img").src = data.thumb_url;
      document.querySelector("p.event").innerHTML = data.upcoming_event_count;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
