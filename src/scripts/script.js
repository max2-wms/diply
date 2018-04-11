(function(){

    var diply = {
        currentPage: 1,
        dataSources: [
            {
                title: 'fun adam sandler facts',
                url: 'https://cdn.diply.com/json/fun-adam-sandler-facts.json'
            },
            {
                title: 'changing rooms test',
                url: 'https://cdn.diply.com/json/changing-rooms-test.json'
            }
        ],

        init: function () {
            this.getCurrentPage()
                .getYear()
                .getFunAdamSandlerFacts()
                .getVideoArticle();
        },

        getFunAdamSandlerFacts: function () {
            this.getData(this.dataSources[0]);

            return this;
        },

        getVideoArticle: function () {
            this.getData(this.dataSources[1]);

            return this;
        },

        getData: function (dataSource) {
            var self = this,
                request = new XMLHttpRequest(),
                data;

            request.open('GET', dataSource.url);

            request.onload = function () {
                if (request.responseText) {
                    data = JSON.parse(request.responseText);

                    if (dataSource.title === 'fun adam sandler facts') {
                        var title = document.getElementById('title'),
                            content = document.getElementById('content'),
                            page = data.Pages[self.currentPage],
                            ad = document.getElementById('ad'),
                            img = document.getElementById('img'),
                            caption = document.getElementById('caption'),
                            images = [],
                            rand = Math.floor((Math.random() * page.length));

                        title.innerHTML = data.Title;

                        for (var i = 0; i < page.length; i++) {
                            switch (page[i].Type) {
                                case 'TextBlock':       content.innerHTML = page[i].Content;
                                                        break;

                                case 'Image':           images.push({
                                                            img: page[i].Url,
                                                            caption: page[i].Caption
                                                        });
                                                        break;

                                case 'Ad Placeholder':  ad.innerHTML = page[i].ComponentId;
                                                        break;
                            }
                        }

                        img.src = images[rand].img;
                        caption.innerHTML = images[rand].caption;

                    } else if (dataSource.title === 'changing rooms test') {

                    }

                    console.log(data);
                }
            };

            request.send();
        },

        getYear: function () {
            var yearDisplayed = document.getElementById('year'),
                d = new Date(),
                currentYear = d.getFullYear();

            yearDisplayed.innerHTML = currentYear;

            return this;
        },

        getCurrentPage: function () {
            if (window.location.href.indexOf('?') !== -1 && window.location.href.indexOf('page=') !== -1) {
                this.currentPage = window.location.href.split('?')[1].split('=')[1];
            }

            console.log('page: ', this.currentPage);

            return this;
        }
    };

    diply.init();

})();