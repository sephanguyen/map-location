;
(function($) {
    console.log("Main JS Loaded");

    $(".radio").click(function() {
        $(this).parent("div").find(".radio").removeClass("checked");
        $(this).addClass("checked");
    });
    $("#form_register .radio, #form-profile .radio").click(function() {
        const val = $(this).find("input").val();

        if (val == 0) {
            $("#form_register .input_doanhnghiep, #form-profile .input_doanhnghiep").addClass("d-none");
            $("#form_register .input_canhan, #form-profile .input_canhan").removeClass("d-none");
        } else {
            $("#form_register .input_doanhnghiep, #form-profile .input_doanhnghiep").removeClass("d-none");
            $("#form_register .input_canhan, #form-profile .input_canhan").addClass("d-none");
        }
    });



    $('#keyword').focus(function() {
        $('.searchform .searchsuggest').show();

        $(this).keyup(function(event) {
            if ($(this).val().length > 0) {
                $('.searchform .searchsuggest .recent').hide();
                $('.searchform .searchsuggest .result').show();
                $(".searchform .locationlist.result").html("<li>8888 Gợi Ý Tìm Kiếm, P.4, Q. Gò Vấp, TP.HCM</li><li>8888 Gợi Ý Tìm Kiếm, P.4, Q. Gò Vấp, TP.HCM</li><li>8888 Gợi Ý Tìm Kiếm, P.4, Q. Gò Vấp, TP.HCM</li>");
            } else {
                $('.searchform .searchsuggest .recent').show();
                $('.searchform .searchsuggest .result').hide();
            }
        });
    }).blur(function() {
        $('.searchform .searchsuggest').hide();
    });
    // navbar
    ;
    (function() {
        const toogle = $('*[data-tn="ucCorpNav-geoDropdown"]');
        if (toogle.length) {
            toogle.click(function(e) {
                e.stopPropagation();
                if ($(this).hasClass('is-active')) {
                    $(this).removeClass("is-active");
                } else {
                    $(this).addClass("is-active");
                }
            });
            $(window).click(function() {
                $(toogle).removeClass("is-active");
            });
        }
    })();

    // Home.php
    ;
    (function($) {
        const formZipCode = $('#form-zip-code');
        if (formZipCode.length) {
            formZipCode.submit(function(e) {
                e.preventDefault();
                const field = $(this).find('*[name="zipCode"]');
                const errorTxt = $('#form-zip-code ~ .marketInsightsInput-error');
                field.removeClass('is-invalid');
                errorTxt.addClass('d-none');
                if (!field.val()) {
                    field.addClass('is-invalid');
                    errorTxt.removeClass('d-none');
                }
            });
        }
    })($);
    // End Home.php

    // development.php

    ;
    (function() {
        $('.geoAgnosticSelector-menu>li>button').hover(function() {
            $(this).addClass("is-selected");
        }, function() {
            $(this).removeClass("is-selected");
        });

        $('.geoAgnosticSelector-menu>li>button').click(function() {
            const txt = $(this).text();
            const el = $('.geoAgnosticSelector-displayText');
            el.text(txt);
        });

        $('.geoAgnosticSelector-wrapper').click(function() {
            const el = $('.cx-flyoutMenu');
            if ($(el).hasClass("d-none")) {
                $(el).removeClass("d-none").addClass("d-block");
            } else {
                $(el).addClass("d-none").removeClass("d-block");
            }
        });
    })();

    // neighborhood-guides-child.php

    ;
    (function() {
        const el = $('.navigation--bar');
        if (el.length !== 0) {
            const elOffsetTop = $(el).offset().top;
            const elHeight = $(el).height();
            const navigationA = $(".navigation--bar a");

            $(navigationA).click(function() {
                const href = $(this).attr("href");
                const offset = $(href).offset().top;
                $('html, body').animate({ scrollTop: offset }, 1000);

                return false;
            });

            const navigationArray = [].slice.call(navigationA);

            $(window).scroll(function() {
                const offset = $(this).scrollTop();
                if (offset > elOffsetTop) {
                    el.addClass("fixed-top");
                    $('body').css("margin-top", `${elHeight}px`);
                } else {
                    el.removeClass("fixed-top");
                    $('body').css("margin-top", `auto`);
                }

                navigationArray.map(e => {
                    const id = $(e).attr("href");
                    const top = $(id).offset().top;
                    if (top <= offset) {
                        $(navigationA).removeClass("active");
                        $(e).addClass("active");
                    }
                });
            });
        }
    })();


    // end

    // Building

    ;
    (function() {
        const tools = $('#tools-navbar');
        if (tools.length) {

            const nav = $(tools).find(".uc-stickyTrigger");

            const scrollFunc = () => {
                const offset = $(window).scrollTop();
                if (offset >= 100) {
                    tools.css("visibility", "visible");
                    nav.addClass("is-truck").removeClass("is-notStuck");
                } else {
                    tools.css("visibility", "hiden");
                    nav.addClass("is-notStuck").removeClass("is-truck")
                }
            };

            scrollFunc();
            $(window).scroll(scrollFunc);
        }

        const btnShowMore = $('.uc-smartHtmlTruncate-showMore');
        if (btnShowMore.length) {
            btnShowMore.click(function() {
                const finds = $(this).parent('div').find('.js-smartTruncate-hidden');
                if (finds.length) {
                    if (btnShowMore.hasClass('active')) {
                        finds.addClass('d-none');
                        btnShowMore.removeClass("active");
                        btnShowMore.text("Read More");
                    } else {
                        finds.removeClass('d-none');
                        btnShowMore.addClass("active");
                        btnShowMore.text("Read Less");
                    }
                }
            });
        }
    })();

    // End Building


    // Quarterly.php

    ;
    (function() {
        const dropdown = $('#dropdown-custom-1');
        if (dropdown.length) {
            const menu = $(dropdown).find(".cx-flyoutMenu");
            const txtField = $(dropdown).find('.cx-selectField');

            const activeClass = 'is-selected';
            $(dropdown).click(function(event) {
                if ($(this).hasClass("active")) {
                    menu.addClass("d-none");
                    $(this).removeClass("active");
                } else {
                    menu.removeClass("d-none");
                    $(this).addClass("active");
                }
                event.stopPropagation();
            });

            $(document).click(function() {
                menu.addClass("d-none");
                $(this).removeClass("active");
            });

            const a = $(menu).find("li");
            a.click(function() {
                a.removeClass(activeClass);
                $(this).addClass(activeClass);
                const txt = $(this).find('a').text();
                txtField.text(txt);
            });
        }
    })();

    // end Quarterly.pph

    // Full Page

    if ($('#fullpage').length) {
        var myFullpage = new fullpage('#fullpage', {
            navigation: false,
            menu: "#menu",
            css3: true
        });
    }

    // end Full Page

    // Commericial

    ;
    (function() {

        const scrollToBot = $('*[data-scroll]');
        if (scrollToBot.length) {
            scrollToBot.click(function(e) {
                const el = $(this).attr("data-scroll");
                $("html, body").animate({
                    scrollTop: $(el).offset().top
                }, 1000);
            });

            const navigationA = $("#dot-navigation li");
            const navigationArray = [].slice.call(navigationA);

            $(window).scroll(function() {
                const offset = $(this).scrollTop();

                navigationArray.map(e => {
                    const id = $(e).attr("data-scroll");
                    const top = $(id).offset().top - 10;
                    if (top <= offset) {
                        $(navigationA).removeClass("active");
                        $(e).addClass("active");

                        const next = $(e).next();
                        if ($('#navigation_next').attr('data-scroll') !== $(next).attr('data-scroll')) {
                            $('#navigation_next').attr('data-scroll', $(next).attr('data-scroll'));
                        }
                    }
                });
            });

            $(document).on('click', '#agents-locations ul li', function(e) {
                var selector = $(this).attr('data-grid');
                $('.agent').removeClass('css_fadeinup');
                $('div[data-grid]').removeClass("active");
                $('div[data-grid="' + selector + '"]').addClass("active");
                const agents = $('div[data-grid="' + selector + '"]').find('.agent');
                [].slice.call(agents).map(function(e, i) {
                    setTimeout(() => {
                        $(e).addClass('css_fadeinup');
                    }, `${i}00`);
                });
                // $grid.isotope({ filter: 'div[data-grid="'+selector+'"]' });
            });
        }
    })();

    // End Commericial


    // Listing
    ;
    (function() {
        const img = $('.eAaStu img');
        if (img.length) {
            img.click(function() {
                $(img).removeClass("kYySaq");
                $(img).addClass("cogaUE");
                $(this).addClass("kYySaq");
                $(this).removeClass("cogaUE");
                $('.jVvtAT').removeClass('d-none');
                $('.dwzoQq').addClass("d-none");
            });
        }
        const btnMore = $('.eGXQWa');
        if (btnMore.length) {
            const txtLess = $('.cLLRSW').find('.txt-less');
            const dots = $('.cLLRSW').find('.dots');
            btnMore.click(function(e) {
                if ($(this).hasClass("active")) {
                    $(this).html(`
                        Tiếp tục đọc
                        <svg class="cx-btn-icon cx-btn-icon--left">
                            <use xlink:href="#cx-icon-arrowheadDown_16x16"></use>
                        </svg>
                    `);
                    $(this).removeClass("active");
                    $(dots).removeClass("d-none");
                    $(txtLess).addClass("d-none");
                } else {
                    $(this).addClass("active");
                    $(dots).addClass("d-none");
                    $(txtLess).removeClass("d-none");
                    $(this).html(`
                        Thu nhỏ
                        <svg class="cx-btn-icon cx-btn-icon--left">
                            <use xlink:href="#cx-icon-arrowheadUp_16x16"></use>
                        </svg>
                    `);
                }
            });
        }

        const btnViewAll = $('#btn-view-all');

        const tableData = window.tableData;

        if (tableData) {
            let bool = false;
            let maxLength = 4;
            let active = '';
            const tbody = $('.eHkOuN tbody');
            if (btnViewAll.length) {
                const tbody = $('.view-more');
                const txt = $(btnViewAll).text();
                btnViewAll.click(function() {
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active");
                        $(tbody).addClass("d-none");
                        $(this).text(txt);
                        bool = false;
                    } else {
                        $(this).text("Thu gọn");
                        $(this).addClass("active");
                        $(tbody).removeClass("d-none");
                        bool = true;
                    }
                    renderTableData();
                });
            }

            const tools = $('.sc-TFwJa');

            tools.click(function() {
                active = $(this).text().toLowerCase();
                $(tools).removeClass("active");
                $(this).addClass("active");
                if (active === "all" || active === "tất cả") {
                    active = "";
                }
                renderTableData();
            });

            const renderTableData = () => {
                let length = tableData.length;

                if (!bool) {
                    length = maxLength > tableData.length ? tableData.length : maxLength;
                }

                let txt = '';
                let j = 0;
                let count = 0;
                for (let i = 0; i < tableData.length; i++) {

                    const { school, type, grades, distance, rating, categories } = tableData[i];

                    if (active !== "") {
                        if (!categories.find(cat => cat.toLowerCase() === active)) {
                            continue;
                        }
                    }

                    count++;
                    if (j < length) {
                        txt += `
                            <tr>
                                <td class="sc-bwzfXH ${ i === length - 1 ? "gCkgEv" : "BFycw" }">${school}</td>
                                <td class="sc-bwzfXH ${ i === length - 1 ? "gCkgEv" : "BFycw" }">${type}</td>
                                <td class="sc-bwzfXH ${ i === length - 1 ? "gCkgEv" : "BFycw" }">${grades}</td>
                                <td class="sc-bwzfXH ${ i === length - 1 ? "gCkgEv" : "BFycw" }">${distance}</td>
                                <td class="sc-bwzfXH ${ i === length - 1 ? "gCkgEv" : "BFycw" }">
                                    <div class="sc-fjmCvl ${
                                        rating === 0 ? "" : rating <= 2 ? "dxEzAJ" : rating <= 4 ? "hDYGFl" : "fVTby"
                                    }">${rating === 0 ? 'NR' : rating}</div>
                                </td>
                            </tr>
                        `;
                    }

                    j++;
                }

                tbody.html(txt);
                if (!bool) {
                    btnViewAll.text(`Xem tất cả ${count}`);
                }
            }

            renderTableData();
        }

    })();

    // authentication
    ;
    (function() {
        const form = $('.authentication#form-required');
        if (form.length) {
            let loading = false;
            form.submit(function(e) {
                e.preventDefault();
                const fieldset = $(this).find('fieldset');
                // if loading stop request;
                if (fieldset.attr("disabled") === "disabled") {
                    return;
                }

                if (fieldset.length) {
                    fieldset.attr("disabled", "disabled");
                }

                let errors = false;

                const fields = $(this).find('input, textarea, select, radio, checkbox');

                if (fields.length) {
                    if ($(fields).hasClass("required")) {
                        const val = $(fields).val();
                        const label = $(fields).parent('label');
                        if (!val) {
                            if (label.length) {
                                errors = true;
                                $(label).addClass("is-invalid");
                                const msg = $(label).find('.cx-formElement-errorMessage');
                                if (msg.length) {
                                    if ($(this).attr('type') === 'email') {
                                        msg.text('Please enter a valid email address');
                                    }
                                    if ($(this).attr('type') === 'password') {
                                        msg.text('Please enter a valid password');
                                    }
                                    msg.removeClass("d-none");
                                }
                            }
                        } else {
                            if (label.length) {
                                $(label).removeClass("is-invalid");
                            }
                        }
                    }
                }

                // Có lỗi nè
                if (errors) {
                    if (btnLoading.length) {
                        btnLoading.removeClass("is-disabled");
                        fieldset.removeAttr("disabled");
                    }
                } else {
                    // ajax ne
                    if (btnLoading.length) {
                        /**
                         * Hiển thị lỗi cho form
                         * @param {string} txt: mô tả của lỗi 
                         */
                        const mgsErros = (txt) => {
                            btnLoading.removeClass("is-disabled");
                            fieldset.removeAttr("disabled");

                            // @ ERROR: User authentication not exists
                            const lbs = $(this).find('label');
                            $(lbs).find('.cx-formElement-errorMessage').addClass("d-none");
                            const lb = lbs[0];
                            $(lb).addClass("is-invalid");
                            $(lb).find('.cx-formElement-errorMessage').text(txt);
                            $(lb).find('.cx-formElement-errorMessage').removeClass("d-none");
                        }

                        // sử dụng cho callback của ajax
                        setTimeout(() => {
                            mgsErros('Specified user does not exist');
                        }, 1000);
                    }
                }

            });
        }
    })();

    // register
    ;
    (function() {
        const form = $('.uc-authenticationForm');
        if (form.length) {
            form.submit(function(e) {
                e.preventDefault();
                const fieldset = $(this).find('fieldset');

                if (fieldset.length && fieldset.attr("disabled") === "disabled") {
                    return;
                }

                if (fieldset.length) {
                    fieldset.attr("disabled", "disabled");
                }

                let errors = false;

                const fields = $(this).find('input, textarea, select, radio, checkbox');

                if (fields.length) {
                    if ($(fields).hasClass("required")) {
                        const val = $(fields).val();
                        const label = $(fields).parent('label');
                        if (!val) {
                            if (label.length) {
                                errors = true;
                                $(label).addClass("is-invalid");
                                const msg = $(label).find('.cx-formElement-errorMessage');
                                if (msg.length) {
                                    if ($(this).attr('type') === 'email') {
                                        msg.text('Please enter a valid email address');
                                    }
                                    if ($(this).attr('type') === 'password') {
                                        msg.text('Please enter a valid password');
                                    }
                                    msg.removeClass("d-none");
                                }
                            }
                        } else {
                            if (label.length) {
                                $(label).removeClass("is-invalid");
                            }
                        }
                    }
                }
                if (fieldset.length) {
                    fieldset.removeAttr("disabled");
                }

            });
        }
    })();

    (function() {
        if ($('.sc-kafWEX').length) {
            const container = $('#lightboxBackdrop');

            const count = $('.footerCount_lkhc9u');

            const max = $('.figure_10ki57k img').length;

            $('.sc-kafWEX').flickity({
                fullscreen: true,
                arrowShape: 'M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z',
                pageDots: false
            });
            $('.eAaStu').flickity({
                asNavFor: '.sc-kafWEX',
                arrowShape: 'M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z',
                wrapAround: true,
                freeScroll: true,
                freeScrollFriction: 0.03,
                pageDots: false
            });

            $('.close_1x3s325').click(function() {
                container.addClass("d-none");
                $("body").removeClass('overflow-hiden');
            });

            $('.bmHVHj').click(function() {
                container.removeClass("d-none");
                $("body").addClass('overflow-hiden');
                const $carousel = $('.figure_10ki57k').flickity({
                    arrowShape: 'M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z',
                    pageDots: false
                });
                $('.paginatedThumbnails_qxqfp1').flickity({
                    asNavFor: '.figure_10ki57k',
                    arrowShape: 'M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z',
                    wrapAround: true,
                    freeScroll: true,
                    freeScrollFriction: 0.03,
                    pageDots: false
                });

                count.text(`1 of ${max}`);

                $carousel.on('change.flickity', function(event, index) {
                    count.text(`${index + 1} of ${max}`);
                });
            });

        }
    });

    function producerResize(){
        $.each($(".producers>div>a"), function(index, val) {
            $(this).height($(this).width());
        });
    }

    producerResize();
    $(window).resize(producerResize);

})(jQuery);

// Listing 
function showStreetView() {
    const id = 'google-map-api';
    const s = 'script';
    const d = document;
    $('.jVvtAT').addClass('d-none');
    $('.dwzoQq').removeClass("d-none");
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWqbo9xnzD5jdwAWjyRsNXCGm4rrAkVBs&callback=initialize";
    js.async = true;
    js.defer = true;
    fjs.parentNode.insertBefore(js, fjs);
}


var panorama;

function initialize() {
    const container = $('.dwzoQq');
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('gallery--streetView'), {
            position: {
                lat: Number($(container).attr('data-lat')),
                lng: Number($(container).attr('data-lng'))
            },
            pov: {
                heading: 165,
                pitch: 0
            },
            zoom: 1
        });
}