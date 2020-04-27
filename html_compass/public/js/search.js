;
(function($) {
    $('[data-toggle="tooltip"]').tooltip()
        /**
         * QUERY ANIMATION
         * NOT USE
         */

    $('.dropdown-toggle-cs').click(function(e) {
        $(this).toggleClass("active");
    });

    $(document).click(function(e) {
        const containers = $(".fillter>div");
        $.each(containers, function() {
            const toogle = $(this).find(".dropdown-toggle");
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0) {
                $(toogle).removeClass("active");
            }
        });
    });
    $(document).click(function(e) {
            const container = $("#form-query");

            if (!$(container).is(e.target) && $(container).has(e.target).length === 0) {
                $(container).removeClass("active");
            }
    });

    const wrap = $(".checkbox-toggle");

    $(wrap).click(function(e) {
        const cb = $(this).find('*[type="checkbox"]:checked');
        const total = $(this).find('*[type="checkbox"]');

        if (cb.length) {
            $(this).find(".tools").removeClass("hide");

            $(this).find(".total").text(total.length);
            $(this).find(".count").text(cb.length);

        } else {
            $(this).find(".tools").addClass("hide");
        }

    });

    $('.btn-clear').click(function(e) {
        const container = $(this).parent("div").parent("div").parent("div");
        const cb = $(container).find('*[type="checkbox"]:checked');
        cb.prop("checked", false);
    });

    const obj = {
        arrowShape: 'M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z',
        pageDots: false,
        contain: true,
        cellAlign: 'left',
        fade: true
    };

    const showTypeView = (callback) => {
        function showGrid() {
            $(this).addClass("is-active");
            $('#show-table').removeClass("is-active");
            $('.table-collections').addClass("d-none");
            $('.collections').removeClass("d-none");

            return callback('grid');
        }
        $('#show-grid').click(showGrid);
        $('#card-view').click(function() {
            $('#show-grid').trigger("click");
        });

        function showTable() {
            $(this).addClass("is-active");
            $('#show-grid').removeClass("is-active");
            $('.table-collections').removeClass("d-none");
            $('.collections').addClass("d-none");

            return callback('table');
        }
        $('#show-table').click(showTable);
        $('#table-view').click(function() {
            $('#show-table').trigger("click");
        });
    }

    // END

    const checkItems = (callback) => {

        const findItemsChecked = () => {
            const checkeds = $('#items-collections .uc-listingCard-checkbox:checked');
            const data = [].slice.call(checkeds).map(node => $(node).attr("data-id"));

            const seleted = $(".selected-count");
            if (data.length) {
                $(seleted).removeClass("d-none");
                $(seleted).find("span").text(data.length);
                $('#save-listing').removeClass("d-none");
            } else {
                $(seleted).addClass("d-none");
                $('#save-listing').addClass("d-none");
            }

            return callback(data);
        };

        $(".clear").click(function() {
            const checkbox = $('.page-content .uc-listingCard-checkbox');
            checkbox.prop("checked", false);
            $(".cx-flyoutMenu-accessory").text("");
            $('.page-content .uc-lolActionBar-checkAllField').prop("checked", false);
            $("#save-listing").addClass("d-none");
            findItemsChecked();
        });

        $(".select-all").click(function() {
            const checkbox = $('.page-content .uc-listingCard-checkbox');
            checkbox.prop("checked", true);
            $(".cx-flyoutMenu-accessory").text(checkbox.length);
            $('.page-content .uc-lolActionBar-checkAllField').prop("checked", true);
            $("#save-listing").removeClass("d-none");
            findItemsChecked();
        });

        // CHECK ALL

        $('.page-content .uc-lolActionBar-checkAllField').click(function(e) {
            const checkbox = $('.page-content .uc-listingCard-checkbox');
            if ($(this).hasClass('is-halfChecked')) {
                $(this).removeClass("is-halfChecked");
                checkbox.prop("checked", false);
                $(this).prop("checked", false);
            } else {
                if ($(this).is(":checked")) {
                    checkbox.prop("checked", true);
                } else {
                    checkbox.prop("checked", false);
                }
            }
            findItemsChecked();
        });

        // A CHECKBOX
        $(document).on("click", ".page-content .uc-listingCard-checkbox", function(e) {
            if ($(this).is(":checked")) {
                $('.page-content .uc-lolActionBar-checkAllField').addClass("is-halfChecked");
            } else {
                $('.page-content .uc-lolActionBar-checkAllField').removeClass("is-halfChecked");
            }
            findItemsChecked();
        });

    };

    /**
     * 
     * @param {number} pos : điều kiện để scroll, số càng nhỏ, càng chạm đáy 
     * @param {*} callback 
     */
    const scrollItems = (callback, pos = 0) => {
        $('.collections').scroll(function(e) {
            const scroll = $(this).scrollTop();
            const wrap = $('#collections-wrap').height();
            const h = $(this).height();
            const total = wrap - (scroll + h) - 1;

            if (total <= pos) {
                return callback(total);
            }
        });
    };

    const hoverItem = (callback) => {
        $(document).on("mouseover", ".item.collection", function() {
            const data = $(this).find(".uc-listingCard-checkbox").attr("data-id");
            return callback(data);
        });
    }


    const renderItemsCollections = (items, clear = false) => {
        const bool = $('.page-content .uc-lolActionBar-checkAllField:checked');

        if ($("#show-grid").hasClass("is-active")) {
            if (clear) {
                $('#items-collections').html('');
            }
            items.map(({ id, slides, label, title, logo, subTitle, metas: { bd, ba, hb, sf }, price }) => {

                const map = (arr, callback) => {
                    const length = arr.length;
                    let txt = '';
                    for (let i = 0; i < length; i++) {
                        txt += callback(arr[i]);
                    }
                    return txt;
                };

                const small = !$("#hide-map").hasClass("is-active");

                $('#items-collections').append(`
                <div class="col-12 ${small ? "col-sm-3" : "col-sm-6"}  mb-4 item collection">
                    <div class="uc-listingCard w-100" data-id="${id}">
                        <div class="uc-listingCard-body w-100">
                            <div class="p-relative">
                                <div
                                    class="uc-listingCard-cornerBox uc-listingCard-cornerBox--compassExclusive">
                                    ${label}
                                </div>
                                <div class="i-checkbox">
                                    <input type="checkbox" ${bool.length ? "checked" : ""} data-id="${id}" class="uc-listingCard-checkbox cx-checkboxField cx-checkboxField--sm">
                                </div>
                                <div class="uc-listingCard-complianceImg"
                                    style="background-image: url('${logo}');">
                                </div>
                                <div class="flickity w-100">
                                    ${
                                    map(slides, ({ img, alt }) => {
                                        return `<img class="w-100 img-fluid" src="${img}" alt="${alt}" />`;
                                    })
                                    }
                                </div>
                            </div>
                            <div class="uc-listingCard-content">
                                <a class="uc-listingCard-title" href="/listing.php">${title}</a>
                                <h2 class="uc-listingCard-subtitle" title="${subTitle}" >${subTitle}</h2>
                                <div class="uc-listingCard-mainStats" data-tn="listingCard-label-price">${price}</div>
    
                                <div class="uc-listingCard-subStats">
                                    <div class="uc-listingCard-subStat uc-listingCard-subStat--beds">
                                        ${bd} BD
                                    </div>
                                    <div class="uc-listingCard-subStat uc-listingCard-subStat--baths">
                                        ${ba} BA
                                    </div>
                                    <div class="uc-listingCard-subStat uc-listingCard-subStat--halfBaths">
                                        ${hb} HB
                                    </div>
                                    <div class="uc-listingCard-subStat uc-listingCard-subStat--sqFt">
                                        ${sf} SF
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="uc-listingCard-footer">
                            <div class="uc-listing-card-actions">
                                <div class="uc-listingCardActionContainer pl-3 pr-3">
                                    <div class="uc-add-to-collection-with-modal-btn">
                                        <button
                                            class="uc-addToCollectionWithModalBtn-button cx-nakedBtn cx-nakedBtn--sm"
                                            type="button" title="Add to Collection">
                                            <svg
                                                class="uc-addToCollectionWithModalBtn-icon cx-btn-icon cx-btn-icon--left">
                                                <use xlink:href="#cx-icon-outlinedStar_14x14"></use>
                                            </svg>
                                            <span class="uc-addToCollectionWithModalBtn-text">Save</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            });

            setTimeout(() => {
                $('.flickity').flickity(obj)
            }, 100);
        } else {
            if (clear) {
                $('.table-collections tbody').html('');
            }
            items.map(({ id, slides, label, title, logo, subTitle, metas: { bd, ba, hb, sf }, price }) => {
                $('.table-collections tbody').append(`
                <tr class="<?php echo $i === 0 ? "is-selected": ""; ?>">
                    <td class="text-truncate col text-right">
                        <input type="checkbox"
                            class="uc-listingCard-checkbox m-0 cx-checkboxField cx-checkboxField--sm">
                    </td>
                    <td class="text-truncate col">${title}</td>
                    <td class="text-truncate col">${subTitle}</td>
                    <td class="text-truncate col">${sf}</td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col">Land</td>
                    <td class="text-truncate col">Coming Soon</td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col">3/5/19</td>
                    <td class="text-truncate col"></td>
                    <td class="text-truncate col">
                        <a target="_blank" href="/listing.php">
                            <button class="cx-nakedBtn cx-nakedBtn--sm">
                                <svg class="cx-btn-icon">
                                    <use xlink:href="#cx-icon-doubleBoxedArrowUpRight_24x24"></use>
                                </svg>
                            </button>
                        </a>
                    </td>
                </tr>
            `);
            });
        }
    }


    // SORT TABLE
    const htmlSort = `<span id="agSortAsc" class="ag-header-icon ag-sort-ascending-icon ag-hidden">
            <svg class="uc-lolTable-colHeaderIcon">
                <use xlink:href="#cx-icon-arrowheadUp_16x16"></use>
            </svg>
        </span>
        <span id="agSortDesc" class="ag-header-icon ag-sort-descending-icon ag-hidden">
            <svg class="uc-lolTable-colHeaderIcon">
                <use xlink:href="#cx-icon-arrowheadDown_16x16"></use>
            </svg>
        </span>
        <span id="agNoSort" class="ag-header-icon ag-sort-none-icon"><svg
                class="uc-lolTable-colHeaderIcon">
                <use xlink:href="#cx-icon-arrowheadUp_16x16"></use>
            </svg>
        </span>`;
    $('.table-collections thead th').append(htmlSort);

    $('.table-collections tbody>tr').click(function(e) {
        $('.table-collections tbody>tr').removeClass("is-selected");
        $(this).addClass("is-selected");
    })

    //@ USE IT
    // SORT QUERY: DESC, ASC, NOT SORT

    // FUNC HERE
    const sortTable = (callback) => {
        $('.table-collections thead th').click(function(e) {
            const attr = $(this).attr("data-sort");
            switch (attr) {
                case "asc":
                    $(this).find('#agSortAsc').addClass("ag-hidden");
                    $(this).find('#agSortDesc').addClass("ag-hidden");
                    $(this).find('#agNoSort').removeClass("ag-hidden");
                    $(this).attr("data-sort", "desc");
                    return callback("asc");
                case "desc":
                    $(this).find('#agSortDesc').addClass("ag-hidden");
                    $(this).find('#agNoSort').addClass("ag-hidden");
                    $(this).find('#agSortAsc').removeClass("ag-hidden");
                    $(this).attr("data-sort", "")
                    return callback("desc");
                default:
                    $(this).find('#agSortAsc').addClass("ag-hidden");
                    $(this).find('#agNoSort').addClass("ag-hidden");
                    $(this).find('#agSortDesc').removeClass("ag-hidden");
                    $(this).attr("data-sort", "asc")
                    return callback(null);
            }
        });
    }

    // END
    function hideMap() {
        if ($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            $('#items').css({
                flex: "0 0 100%",
                maxWidth: "100%"
            });

            $("#map").removeClass("d-none");
            $('.item').addClass("col-sm-3").removeClass("col-sm-6");

            if ($("html, body").width() <= 768) {
                $("#items").addClass("d-none");
            } else {
                $("#items").removeClass("d-none");
            }
        } else {
            $(this).addClass("is-active");
            $('#items').removeAttr("style");

            $('.item').removeClass("col-sm-3").addClass("col-sm-6");

            if ($("html, body").width() <= 768) {
                $("#items").removeClass("d-none");
                $("#map").addClass("d-none");
            } else {
                $("#items").removeClass("d-none");
                $("#map").removeClass("d-none");
            }
        }
        setTimeout(() => {
            $('.flickity').flickity(obj)
        }, 200);
    }
    $('#hide-map').click(hideMap);
    $('#map-view').click(function() {
        $('#hide-map').trigger("click");
    });

    $('#price input').keyup(function() {
        let min = $('#price input.min').val() !== "" && $('#price input.min').val() !== "$ " && $('#price input.min').val() !== "$" ? $('#price input.min').val().match(/\d+/g).map(Number) : "";
        let max = $('#price input.max').val() !== "" && $('#price input.max').val() !== "$ " && $('#price input.max').val() !== "$" ? $('#price input.max').val().match(/\d+/g).map(Number) : "";
        const val = $(this).val() !== "" && $(this).val() !== "$ " && $(this).val() !== "$" ? $(this).val().match(/\d+/g).map(Number) : "";

        if (val) {
            $(this).val(`$ ${val}`);
        }

        if (min.length) {
            min = min[0];
        }
        if (max.length) {
            max = max[0];
        }

        if (max === '' && min) {
            showQuery('price', { min }, `Price: Over ${min}`);
        } else if (min === '' && max) {
            showQuery('price', { max }, `Price: Under ${max}`);
        } else if (min && max) {

            $('.cx-formElement-errorMessage').addClass("d-none");

            if (min > max) {
                return $(this).parent("span").find(".cx-formElement-errorMessage").removeClass("d-none");
            }

            showQuery('price', { min, max }, `Price: ${min} to ${max}`);
        } else {
            showQuery('price', {});
        }

    });

    const saveBtn = $('.uc-searchBarOmnibox-save');
    const closeBtn = $('.uc-searchBarOmnibox-clear');

    $(closeBtn).click(function() {
        saveBtn.addClass("d-none");
        $(this).addClass("d-none");
        $('.uc-searchBarOmnibox-choices').html('');
        // $('.uc-searchBarOmnibox-choices').addClass("d-none").removeClass("d-flex");
        $('.fillter input[type="radio"]').prop("checked", false);
        $('.fillter input[type="checkbox"]').prop("checked", false);
        $('.fillter input[type="text"]').val();
        $('.fillter input[type="number"]').val();
        $('.fillter select').val();
        $(".uc-searchBarOmnibox-moreChoicesCount").addClass('d-none');
        _data = {};
        detectWidthSearchField();
        return getQueries(_data);

    });

    $('*[name="beds[]"]').change(function() {
        const cb = $('*[name="beds[]"]:checked');
        const vals = [].slice.call(cb).map(node => $(node).val());

        let txt = '';

        vals.map((val, i) => {
            if (txt !== "") {
                if (i === vals.length - 1) {
                    txt += ' or ';
                } else {
                    txt += ", ";
                }
            }
            txt += val;
        });

        if(cb.length){
            showQuery('beds', vals, `Beds: ${txt}`);
        }else{
            showQuery('beds', vals, "");
        }
    });
    $('*[name="bath"]').click(function() {
        const bath = $(this).val();
        const d = $('*[name="includeUnknownBath"]:checked');
        let val = {};

        if (d.length) {
            val = { bath, Unknown: true };
            showQuery('baths', val, `Baths: ${bath} Or Unkown`);
        } else {
            val = { bath, Unknown: false };
            if(bath){
                showQuery('baths', val, `Baths: ${bath}`);
            }else{
                showQuery('baths', val, '');
            }
        }
    });
    $('*[name="includeUnknownBath"]').click(function() {
        const d = $('*[name="bath"]:checked');
        let val = {};

        if (d.length) {
            const bath = $(d).val();
            val = { bath, Unknown: false };
            if ($(this).is(":checked")) {
                showQuery('baths', val, `Baths: ${bath} Or Unknown`);
            } else {
                showQuery('baths', val, `Baths: ${bath}`);
            }
        } else {
            val = { bath: { Unknown: true } };
            showQuery('baths', val, `Baths: Unknown`);
        }

    });

    $('#locations *[type="checkbox"]').click(function(e) {
        const val = $(this).val();
        let locations = [].slice.call($('#locations *[type="checkbox"]:checked')).map(node => $(node).val());

        if ($(this).is(":checked")) {
            showQuery('locations', locations, val, val, true);
        } else {
            showQuery('locations', locations, '', val, true);
            $(`*[data-value="${val}"]`).remove();
        }
        showMoreField();
    });

    $(document).on("click", "li#locations", function() {
        const val = $(this).attr('data-value');
        $(`#locations *[value="${val}"]`).trigger("click");
        showMoreField();
    })

    $(document).on("click", "ul.uc-searchBarOmnibox-choices>li#price", function() {
        $('#price input.min').val('');
        $('#price input.max').val('');
        showMoreField();
    });
    $(document).on("click", "ul.uc-searchBarOmnibox-choices>li#beds", function() {
        $('#beds input[name="beds[]"]').prop("checked", false);
        showMoreField();
    });
    $(document).on("click", "ul.uc-searchBarOmnibox-choices>li#baths", function() {
        $('#baths input[name="baths"]').prop("checked", false);
        $('#baths input[name="includeUnknownBath"]').prop("checked", false);
        showMoreField();
    });

    $(document).on("click", '.cx-token-btn', function() {

        $(this).parent("li").remove();

        if(!$(this).parent("li").parent("ul").find("li").length){
            saveBtn.addClass("d-none");
            closeBtn.addClass("d-none");
        }

        showMoreField();

    });

    function showMoreField(willInsert = false) {
        const max = 5;

        const length = $('.uc-searchBarOmnibox-choices li').length;

        bool = length + (willInsert ? 1 : 0) >= max;

        if (bool) {
            const count = (length + (willInsert ? 1 : 0)) - max + 1;
            
            if(count){
                $('.uc-searchBarOmnibox-moreChoicesCount').removeClass("d-none");
                $('.uc-searchBarOmnibox-moreChoicesCount .count').text(count);
            }else{
                $('.uc-searchBarOmnibox-moreChoicesCount').addClass("d-none");
            }
        } else {
            $('.uc-searchBarOmnibox-moreChoicesCount').addClass("d-none");
        }

        if (length === 0) {
            if (!willInsert) {
                // $('.uc-searchBarOmnibox-choices').addClass("hide");
            } else {
                $('.uc-searchBarOmnibox-choices').removeClass("hide");
            }
        } else if (length || willInsert) {
            $('.uc-searchBarOmnibox-choices').removeClass("hide");
        }

        return bool;
    }

    function detectWidthSearchField(){
        const container = $('.search-wrap').width();
        const els = $(".search-wrap>div");
        const search = $(".search-wrap>div:last");

        let w = 0;

        $.each(els, function(index, val) {
            if(index < 3){
                w += $(this).width();
            }
        });
        if($(window).width() >= 768){
            const total = container - w - 100;
            search.width(total);
        }else{
            const total = container - w - 30;
            search.width(total);
        }

    }
    detectWidthSearchField();
    $(window).resize(detectWidthSearchField);
    /**
     * Use ajax here to query data
     * @param {*} id 
     * @param {*} txt 
     */
    let _data = {};

    function showQuery(id, val, txt, dataValue = '', insertNew = false) {

        const exists = $('.uc-searchBarOmnibox-choices').find(`#${id}`);

        if (!insertNew && exists) {
            delete _data[id];
            exists.remove();
        }

        if (txt) {
            let str = `<li id="${id}" data-value="${dataValue}" class="uc-searchBarOmnibox-choice cx-token ${showMoreField(true) ? "d-none k-hide" : "active"}" title="Collier County" tabindex="-1">
            <span class="uc-searchBarOmnibox-choiceText">${txt}</span>
            <span class="uc-searchBarOmnibox-choiceBtn cx-token-btn" role="button">
                <svg class="cx-token-icon">
                    <use xlink:href="#cx-icon-x_16x16"></use>
                </svg>
            </span>
            </li>`;

            saveBtn.removeClass("d-none");
            closeBtn.removeClass("d-none");

            $('.uc-searchBarOmnibox-choices').append(str);

            detectWidthSearchField();
        }else{
            setTimeout(() => {
                if(!$(".uc-searchBarOmnibox-choices>li").length){
                    saveBtn.addClass("d-none");
                    closeBtn.addClass("d-none");
                }
            }, 200);
        }

        _data[id] = val;
        return getQueries(_data);
    }

    function showSearchResult(val) {
        setTimeout(() => {
            $('#search-results').removeClass("d-none");
        }, 200);
        if (val !== "") {
            $('#search-results .results').removeClass("d-none");

            $(".is-empty-field-search").addClass("d-none");
        } else {
            $('#search-results .results').addClass("d-none");

            $(".is-empty-field-search").removeClass("d-none");
        }
    }

    $('#search-field').focus(function(e) {
        e.preventDefault();
        showSearchResult($(this).val());

        setTimeout(() => {
        if ($(window).width() <= 768) {
            $('#form-query').addClass("active");
        } else {
            $('#form-query').removeClass("active");
        }
        }, 100);
    });

    let loading = false;
    $('#search-field').keyup(function(e) {
        const val = $(this).val();

        $('#search-keyword').text(val);

        showSearchResult(val);

        if (loading) {
            return;
        }

        loading = true;
        $('#search-results .loading').removeClass("d-none");
        setTimeout(() => {
            $('#search-results .loading').addClass("d-none");
            loading = false;
        }, 300);

    });

    $('#search-results .result').hover(function() {
        $('#search-results .result').removeClass("active");
        $(this).addClass("active");
    });

    $(document).on("click", ".results .result", function() {
        $('#form-query').removeClass("active");
        $("#search-results").addClass("d-none");

        const val = $(this).text();
        showQuery("search", val, val);

        $('#search-field').val('');
    });

    $(document).click(function(e) {
        const container = $('#search-results');

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(container).addClass("d-none");
            // if($(window).width() <= 768){
            //     $('#form-query').removeClass("active");
            // }else{
            //     $('#form-query').addClass("active");
            // }
        }
    });

    $(document).on("click", ".filter-mobile *[data-href]", function() {
        const href = $(this).attr("data-href");
        const find = $(`.filter-mobile *[data-id="${href}"]`);
        console.log(href);
        if (find.length) {
            $(".filter-mobile>div").removeClass("active");
            $(find).addClass("active")
        } else {
            $(".filter-mobile .menu-home").addClass("active");
        }
    });

    $('.uc-searchBarTooMobileMenu-closeBtn').click(function() {
        $(".filter-mobile").removeClass("active");
    });
    $('#show-filter-mobile').click(function() {
        $(".filter-mobile").addClass("active");
    });

    $(".group-a .redo-search").click(function() {
        $(this).addClass("d-none");
        $(".group-a .search-as").removeClass("d-none");
    });
    $(".group-a .edit").click(function() {
        $(".group-a").addClass("d-none");
        $(".group-b").removeClass("d-none");
    });

    $(".group-b .trash").click(function() {
        $(".jump-to-address").val("");
    });

    $(".group-b .done").click(function() {
        $(".group-b").addClass("d-none");
        $(".group-a").removeClass("d-none");
        $(".group-a .search-as").addClass("d-none");
        $(".group-a .redo-search").removeClass("d-none");
    });

    $(".close-map").click(function() {
        $('#hide-map').trigger("click");
    });

    function resizeMap() {
        if ($(this).width() <= 768) {
            $("#map").addClass("d-none");
        } else {
            $("#hide-map").addClass("is-active");
            $("#map").removeClass("d-none");
        }
    }
    $(window).resize(resizeMap);
    resizeMap();
    /**
     * Các hàm có thể dùng ở đây
     */

    /**
     * Chọn kiểu hiển thị của items
     * hiển thị theo dạng grid
     * hoặc table
     */
    showTypeView((type) => {
        renderItemsCollections(window.items, true);
        if (type === "grid") {
            if (!$("#hide-map").hasClass("is-active")) {
                $('.item').addClass("col-sm-3").removeClass("col-sm-6");
            } else {
                $('.item').removeClass("col-sm-3").addClass("col-sm-6");
            }
        }
    });
    renderItemsCollections(window.items);

    /**
     * hàm dùng để sort khi ng dùng click vào table để hiển thị theo sắp xếp
     * @param {any} type: desc | asc | null
     */
    sortTable((type) => {
        console.log("Sort table", type);
    });

    /**
     * Hàm dùng để lấy query khi ng dùng chọn vào mục filter
     * @param {object} data 
     */
    const getQueries = ((data) => {
        console.log('query', data);
    });

    checkItems(items => {
        console.log("checked items", items);
        $(".cx-flyoutMenu-accessory").html(items.length);
    });

    /**
     * Scroll items trong collections
     */
    scrollItems((scroll) => {
        renderItemsCollections(window.items);
    }, 0);

    /**
     * Hover items trong collections
     */
    hoverItem(id => {
        console.log("Mouse over", id);
    });

})(jQuery);