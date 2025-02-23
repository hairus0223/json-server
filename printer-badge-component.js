class PrintBadgeComponent extends HTMLElement {
  constructor() {
    super();
    const font = document.createElement("link");
    font.href =
      "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";
    font.rel = "stylesheet";
    document.head.appendChild(font);
    this.attachShadow({ mode: "open" });
    this.attendee = {};
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data" && newValue !== oldValue) {
      try {
        this.attendee = JSON.parse(newValue);
      } catch (error) {
        console.error("Invalid JSON data:", error);
      }
    }
  }

  async connectedCallback() {
    // const response = await fetch('print-badge-component.html');
    await this.loadStyles();
    // const html = await response.text();

    this.shadowRoot.innerHTML = `
      <head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
      </head>
      <body>
        <div class="badge-wrapper">
          <div class="body--a6">
            <div class="d-block">
                <div class="article--container">
                    <article>
                      <div class="qr--wrapper">
                        <img id="qrImage"></img>
                        <small id="ticketCode"></small>
                      </div>
  
                      <div id="textWrapper" class="text--wrapper">
                          <div class="name--wrapper">
                            <p id="badgeName" class="name"></p>
                          </div>
                          <div class="delegation--wrapper">
                            <p id="badgeCompany" class="delegation"></p>
                            <p id="badgeTitle" class="delegation"></p>
                            <p id="badgeCountry" class="delegation"></p>
                          </div>
                      </div>
                      <div id="typeWrapper" class="type--wrapper">
                          <p id="badgeCategory" class="type"></p>
                      </div>
                      <div id="typeWrapper2" class="type--wrapper2">
                          <p id="badgeCategory2" class="type"></p>
                      </div>
                    </article>
                </div>
            </div>
          </div>
        </div>
      </body>`;
  }

  async loadStyles() {
    const styles = `
      @font-face {
        font-family: "Roboto";
        src: url(./fonts/Roboto-Regular.ttf);
        font-weight: normal;
      }
      @font-face {
        font-family: "Roboto";
        src: url(./fonts/Roboto-Black.ttf);
        font-weight: 900;
      }
      @media print {
        .layout-wrapper, .dtfc-right-top-blocker, .dtfh-floatingparent{
          display: none !important;
        }
        .badge-wrapper {
          line-height: 150%;
          opacity: 1 !important;
          visibility: visible !important;
          z-index: 999;
        }
        .body--a6 {
          color: black;
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 0;
          position: relative;
          height: 290mm !important;
          width: 100mm !important;
          border: 2px solid transparent;
        }
  
        .body--a6 small {
          font-size: 11px;
        }
  
        .body--a6 div.article--container {
          margin-top: 104px;
          page-break-after: always;
          position: relative;
        }
  
        .body--a6 div.qr--wrapper {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
  
        .body--a6 div.qr--wrapper img {
          height: 106px;
          width: 106px;
        }
  
        .body--a6 div.delegation--wrapper {
          text-align: center;
        }
  
        .body--a6 div.text--wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-height: 175px;
          min-height: 175px;
          padding: 5px 0px;
          text-align: center;
        }
  
        .body--a6 div.type--wrapper {
          position: absolute;
          width: 100%;
          text-align: center;
          margin-top: 0.5rem;
          top: 335px;
        }
  
        .body--a6 div.type--wrapper2 {
          position: absolute;
          width: 100%;
          text-align: center;
          margin-top: 0.5rem;
          top: 548px;
          transform: rotate(180deg);
        }
  
        .body--a6 p {
          line-height: 28px;
        }
  
        .body--a6 p.name {
          font-weight: 900;
          font-size: 22.1px;
          line-height: 20px;
          margin-top: 0;
          margin-bottom: 0.7rem;
          text-transform: uppercase;
          padding: 0mm 13mm;
          word-wrap: break-word;
        }
  
        .body--a6 p.delegation {
          font-size: 16.9px;
          text-transform: uppercase;
          line-height: 16px;
          margin-top: 0;
          margin-bottom: 0.4rem;
          padding: 0mm 13mm;
        }
  
        .body--a6 p.type {
          font-weight: 900;
          font-size: 38px;
          margin: 0;
          text-transform: uppercase;
        }
      }
      .badge-wrapper {
        position: absolute;
        opacity: 0;
        top: 0;
        z-index: -99;
      }
      .body--a6 {
        color: black;
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        position: relative;
        height: 152mm;
        width: 100mm !important;
        border: 2px solid transparent;
      }
      .body--a6 small {
        font-size: 11px;
      }
      .body--a6 div.article--container {
        margin-top: 104px;
        page-break-after: always;
        position: relative;
      }
      .body--a6 div.qr--wrapper {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .body--a6 div.qr--wrapper img {
        height: 106px;
        width: 106px;
      }
      .body--a6 div.delegation--wrapper {
        text-align: center;
      }
      .body--a6 div.text--wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-height: 175px;
        min-height: 175px;
        padding: 5px 0px;
        text-align: center;
      }
      .body--a6 div.type--wrapper {
        position: absolute;
        width: 100%;
        text-align: center;
        margin-top: 0.5rem;
        top: 335px;
      }
      .body--a6 div.type--wrapper2 {
        position: absolute;
        width: 100%;
        text-align: center;
        margin-top: 0.5rem;
        top: 548px;
        transform: rotate(180deg);
      }
      .body--a6 p {
        line-height: 28px;
      }
      .body--a6 p.name {
        font-weight: 900;
        font-size: 22.1px;
        line-height: 20px;
        margin-top: 0;
        margin-bottom: 0.7rem;
        text-transform: uppercase;
        padding: 0mm 13mm;
        word-wrap: break-word;
      }
      .body--a6 p.delegation {
        font-size: 16.9px;
        text-transform: uppercase;
        line-height: 16px;
        margin-top: 0;
        margin-bottom: 0.4rem;
        padding: 0mm 13mm;
      }
      .body--a6 p.type {
        font-weight: 900;
        font-size: 38px;
        margin: 0;
        text-transform: uppercase;
      }`;
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    this.shadowRoot.adoptedStyleSheets = [styleSheet];
  }

  addEventListeners() {
    const logButton = this.shadowRoot.querySelector("button");
    if (logButton) {
      logButton.addEventListener("click", () => {
        console.log("Data:", this.attendee);
      });
    }

    const triggerButton = this.shadowRoot.querySelector("#triggerEvent");
    if (triggerButton) {
      triggerButton.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("customEvent", {
            detail: {
              message: "Event from Web Component",
              data: this.attendee,
            },
            bubbles: true,
            composed: true,
          })
        );
      });
    }
  }

  onPrint(attendee) {
    return new Promise((resolve) => {
      console.log("triggered from HTML!", attendee);

      this.attendee = attendee;
      this.updateTemplate();
      setTimeout(() => {
        // window.print();
        const categorySplit =
          this.attendee.S_category.toUpperCase().split("PASS")[0];

        if (categorySplit.length > 12) {
          const badgeCategory =
            this.shadowRoot?.getElementById("badgeCategory");
          const badgeCategory2 =
            this.shadowRoot?.getElementById("badgeCategory2");
          badgeCategory.style.fontSize = "38px";
          badgeCategory2.style.fontSize = "38px";
        }

        // Reset all font sizes and line heights

        const badgeName = this.shadowRoot?.getElementById("badgeName");
        const badgeCompany = this.shadowRoot?.getElementById("badgeCompany");
        const badgeCountry = this.shadowRoot?.getElementById("badgeCountry");
        const badgeTitle = this.shadowRoot?.getElementById("badgeTitle");

        if (badgeName) {
          badgeName.style.fontSize = "22.1px";
          badgeName.style.lineHeight = "20px";
        }

        if (badgeCompany) {
          badgeCompany.style.fontSize = "16.9px";
          badgeCompany.style.lineHeight = "16px";
        }

        if (badgeCountry) {
          badgeCountry.style.fontSize = "16.9px";
          badgeCountry.style.lineHeight = "16px";
        }

        if (badgeTitle) {
          badgeTitle.style.fontSize = "16.9px";
          badgeTitle.style.lineHeight = "16px";
        }

        resolve("done");
      }, 100);
    });
  }

  updateTemplate() {
    const decodeHTMLEntities1 = (rawStr) => {
      return rawStr.replace(
        /&#(\d+);/g,
        (match, dec) => `${String.fromCharCode(dec)}`
      );
    };

    const decodeHTMLEntities = (text) => {
      var textArea = document.createElement("textarea");
      textArea.innerHTML = text;
      return textArea.value;
    };

    /**
     * * Set the HTML template data here
     */
    const badgeName = this.shadowRoot?.getElementById("badgeName");
    if (badgeName)
      badgeName.textContent = decodeHTMLEntities(
        decodeHTMLEntities1(this.attendee.S_name_on_badge)
      );

    const badgeCompany = this.shadowRoot?.getElementById("badgeCompany");
    if (badgeCompany)
      badgeCompany.textContent = decodeHTMLEntities(
        decodeHTMLEntities1(this.attendee.S_company)
      );

    const badgeTitle = this.shadowRoot?.getElementById("badgeTitle");
    if (badgeTitle)
      badgeTitle.textContent = decodeHTMLEntities(
        decodeHTMLEntities1(this.attendee.S_job_title)
      );

    const badgeCountry = this.shadowRoot?.getElementById("badgeCountry");
    if (badgeCountry)
      badgeCountry.textContent = decodeHTMLEntities(
        decodeHTMLEntities1(this.attendee.S_country)
      );

    const categorySplit =
      this.attendee.S_category.toUpperCase().split("PASS")[0];

    const badgeCategory = this.shadowRoot?.getElementById("badgeCategory");
    if (badgeCategory) badgeCategory.textContent = categorySplit;

    const badgeCategory2 = this.shadowRoot?.getElementById("badgeCategory2");
    if (badgeCategory2) badgeCategory2.textContent = categorySplit;

    const ticketCode = this.shadowRoot?.getElementById("ticketCode");
    if (ticketCode)
      ticketCode.textContent = this.attendee.S_ticket_code.toUpperCase();

    const qrImg = this.shadowRoot?.getElementById("qrImage");
    if (qrImg) {
      const src = `https://qr.occamlab.com.sg/${this.attendee.S_ticket_code}.png?c=fhrc-2024-c.jpg&m=0`;
      qrImg.setAttribute("src", src);
    }

    if (categorySplit.length > 12) {
      badgeCategory.style.fontSize = "29px";
      badgeCategory2.style.fontSize = "29px";
      // const typeWrapper2 = this.shadowRoot?.getElementById('typeWrapper2');
      // typeWrapper2.style.top = '533px';
    }

    const textWrapper = this.shadowRoot?.getElementById("textWrapper");
    if (textWrapper.scrollHeight > textWrapper.clientHeight) {
      this.resizeText();
    }
  }

  computeLines(el) {
    return Math.floor(
      el.offsetHeight /
        parseInt(getComputedStyle(el).lineHeight.replace("px", ""))
    );
  }

  resizeText() {
    console.log("resize!");
    const textWrapper = this.shadowRoot?.getElementById("textWrapper");
    const badgeName = this.shadowRoot?.getElementById("badgeName");
    const badgeCompany = this.shadowRoot?.getElementById("badgeCompany");
    const badgeCountry = this.shadowRoot?.getElementById("badgeCountry");
    const badgeTitle = this.shadowRoot?.getElementById("badgeTitle");
    let nameFont = parseFloat(
      getComputedStyle(badgeName).fontSize.replace("px", "")
    );
    let nameLineHeight = parseFloat(
      getComputedStyle(badgeName).lineHeight.replace("px", "")
    );
    let detailsFont = parseFloat(
      getComputedStyle(badgeCompany).fontSize.replace("px", "")
    );
    let detailsLineHeight = parseFloat(
      getComputedStyle(badgeCompany).lineHeight.replace("px", "")
    );
    let nameLoop = 1;
    let delegationLoop = 1;
    while (textWrapper.offsetHeight < textWrapper.scrollHeight) {
      nameFont--;
      nameLineHeight--;
      badgeName.style.fontSize = nameFont + "px";
      badgeName.style.lineHeight = nameLineHeight + "px";

      nameLoop += 1;
      console.log(nameLoop);

      if (textWrapper.offsetHeight >= textWrapper.scrollHeight) break;

      delegationLoop += 1;
      console.log(delegationLoop);

      detailsFont--;
      detailsLineHeight--;
      badgeCompany.style.fontSize = detailsFont + "px";
      badgeCountry.style.fontSize = detailsFont + "px";
      badgeTitle.style.fontSize = detailsFont + "px";
      badgeCompany.style.lineHeight = detailsLineHeight + "px";
      badgeCountry.style.lineHeight = detailsLineHeight + "px";
      badgeTitle.style.lineHeight = detailsLineHeight + "px";
    }
  }
}

customElements.define("print-component", PrintBadgeComponent);
