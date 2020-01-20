import React from "react";
import { Menu } from "../components";
import "./Credits.css";

class Credits extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Menu />
        <div className="otherInfo">
          <h4>
            Backend and HOC's adapted from "Kwitter" project skeleton, by Taylor
            Hurt, Kenzie Academy 2nd Quarter Instructor
          </h4>
          <h4>Technologies used: JavaScript Library, HTML, CSS, React-Redux</h4>
          <h4>The people who made this happen:</h4>
        </div>
        <div className="teamBox">
          <div id="janell">
            Janell Huyck
            <br />
            <hr />
            Connect with Janell
            <a href="https://www.linkedin.com/in/janell-huyck-b050a05a/">
              LinkedIn
            </a>
            <a href="https://gitlab.com/Janell">Gitlab</a>
          </div>

          <hr />

          <div className="team">
            <div className="gyals">
              <div id="drashti">
                Drashti Dalsania
                <br />
                <hr />
                Connect with Drashti
                <a href="https://gitlab.com/dpdalsania">GitLab</a>
              </div>

              {/* <hr className="verticalLine" /> */}

              <div id="leighann">
                LeighAnn Featheringill
                <br />
                <hr />
                Connect with LeighAnn
                <a href="https://drive.google.com/file/d/1K3U1q4cI3TkTqwLVFh3G4-jB2uo4UhZf/view?usp=sharing">
                  LeighAnn's Impressive Resume
                </a>
                <a href="https://www.linkedin.com/in/leighann-featheringill/">
                  LinkedIn
                </a>
              </div>

              <div id="kano">
                Kano Marvel
                <br />
                <hr />
                Connect with Kano
                <a href="https://www.linkedin.com/in/karen-kano-marvel-3761b0b5/">
                  LinkedIn
                </a>
                <br />
              </div>

              <div id="chelsea">
                Chelsea White
                <br />
                <hr />
                Connect with Chelsea
                <a href="https://www.linkedin.com/in/chelsea-white-34b19735/">
                  LinkedIn
                </a>
                <a href="https://www.gitlab.com/chelseawhite">GitLab</a>
              </div>
            </div>

            <hr />

            <div className="guys">
              <div id="andrew">
                Andrew Belanger
                <br />
                <hr />
                Connect with Andrew
                <a href="https://www.linkedin.com/in/andrew-belanger-014a1018b/">
                  LinkedIn
                </a>
              </div>

              <div id="givon">
                Givon Dickeron
                <br />
                <hr />
                Connect with Givon
                <a href="https://www.linkedin.com/in/givondickerson/">
                  LinkedIn
                </a>
                <a href=" https://gitlab.com/givond4">GitLab</a>
                <a href="https://www.codewars.com/users/givond4">CodeWars</a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Credits;
