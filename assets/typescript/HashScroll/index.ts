/**
 * Binds all links which targets the own page and have a hash-anchor.
 */
export class HashScroll {
    private _headerOffset: number = 0;
    private _links: NodeListOf<HTMLAnchorElement> = null;
    private _selectorPattern: RegExp = /^[a-zA-Z0-9_-]*$/;

    constructor() { }

    setHeaderOffset(headerOffset: number): this {
        this._headerOffset = headerOffset;
        return this;
    }

    init(): this {
        return this.checkInitialHash().initLinks();
    }

    /**
     * Checks if there is an initial hash in url and tries to scroll to the section
     */
    protected checkInitialHash(): this {
        // scroll to position when target is set in url
        if (window.location && window.location.hash) {
            let target = document.querySelector(window.location.hash);
            if (target) {
                let _this = this;
                setTimeout(function () {
                    window.scrollTo({
                        top:
                            target.getBoundingClientRect().top +
                            window.scrollY -
                            _this._headerOffset,
                        behavior: "smooth",
                    });
                }, 1000);
            }
        }

        return this;
    }

    /**
     * checks all links on page which have a hash to an existing element and binds them to scroll
     */
    protected initLinks(): this {
        let _this = this;
        this._links = document.querySelectorAll("a");
        for (let l = 0; l < this._links.length; l++) {
            // disabled when explicitly data-hash-scroll="none" is set.
            if (this._links[l].hasAttribute("data-hash-scroll") && this._links[l].getAttribute("data-hash-scroll") === "none") {
                continue;
            }

            if (this._links[l].hasAttribute("href")) {
                if (this.getValidTarget(this._links[l].getAttribute("href"))) {
                    this._links[l].addEventListener(
                        "click",
                        function (event) {
                            let target = _this.getValidTarget(this.getAttribute("href"));
                            if (target) {
                                event.preventDefault();
                                window.scrollTo({
                                    top:
                                        target.getBoundingClientRect().top +
                                        window.scrollY -
                                        _this._headerOffset,
                                    behavior: "smooth",
                                });
                            }
                        },
                        false
                    );
                }
            }
        }

        return this;
    }

    getValidTarget(href: string): null | Element {
        // there should be a uri, the location object and a hash
        if (!(href && window.location && href.indexOf("#") > -1)) {
            return null;
        }

        let hash = href.substr(href.indexOf("#") + 1);

        // there should be something in the hash and an element with matching id
        if (!(hash && this._selectorPattern.exec(hash) && document.querySelector("#" + hash))) {
            return null;
        }

        let host = "";
        let path = "";

        if (href.indexOf("//") > -1) {
            // there is a protocol divider - and there should be a host
            host = href.substr(href.indexOf("//") + 2);
            host = host.substr(0, host.indexOf("/"));

            path = href.substr(href.indexOf("//") + 2);
            path = path.substr(path.indexOf("/"), path.indexOf("#") - path.indexOf("/"));
        } else {
            path = href.substr(0, href.indexOf("#"));
        }

        // if host is different between href and current location the target is on another host
        if (host && host !== window.location.host) {
            return null;
        }

        // check, if path of href is the same as on the current page
        if (path === window.location.pathname) {
            return document.querySelector("#" + hash);
        }

        return null;
    }
}
