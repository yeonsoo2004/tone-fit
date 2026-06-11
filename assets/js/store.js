/* =========================================
   TONE:FIT Store Page Script (store.js)
========================================= */

/* =========================================
   1. 매장 데이터
========================================= */
const storeData = [
    {
        name: '시흥 능곡점',
        address: '경기도 시흥시 능곡안민길 22 다나삼꼬지타 110호',
        tel: '031-000-0001',
        hours: '10:00 ~ 22:00 (연중무휴)',
        parking: '건물 내 주차 가능',
        lat: 37.3797,
        lng: 126.8031
    },
    {
        name: '충북 제천점',
        address: '충청북도 제천시 하방대로 105 1읍 102호',
        tel: '043-000-0002',
        hours: '10:00 ~ 22:00 (연중무휴)',
        parking: '건물 내 주차 가능',
        lat: 37.1327,
        lng: 128.1909
    },
    {
        name: '부평 굴포천역점',
        address: '인천광역시 부평구 길주로 669 1층',
        tel: '032-000-0003',
        hours: '10:00 ~ 22:00 (연중무휴)',
        parking: '인근 공영주차장 이용',
        lat: 37.5072,
        lng: 126.7219
    },
    {
        name: '서울 군자역점',
        address: '서울특별시 광진구 능동로 300 1층',
        tel: '02-000-0004',
        hours: '10:00 ~ 22:00 (연중무휴)',
        parking: '건물 내 주차 가능',
        lat: 37.5497,
        lng: 127.0793
    },
    {
        name: '홍대상수점',
        address: '서울특별시 마포구 독막로 15길 12 1층',
        tel: '02-000-0005',
        hours: '11:00 ~ 23:00 (연중무휴)',
        parking: '인근 공영주차장 이용',
        lat: 37.5479,
        lng: 126.9228
    },
    {
        name: '부천 역곡점',
        address: '경기도 부천시 원미구 부일로 743 1층',
        tel: '032-000-0006',
        hours: '10:00 ~ 22:00 (연중무휴)',
        parking: '건물 내 주차 가능',
        lat: 37.4878,
        lng: 126.8219
    },
    {
        name: '세종 아름점',
        address: '세종특별자치시 보듬3로 104 1층',
        tel: '044-000-0007',
        hours: '10:00 ~ 22:00 (연중무휴)',
        parking: '건물 내 주차 가능',
        lat: 36.4877,
        lng: 127.2588
    },
    {
        name: '신용산점',
        address: '서울특별시 용산구 한강대로 95 1층',
        tel: '02-000-0008',
        hours: '10:00 ~ 22:00 (연중무휴)',
        parking: '인근 공영주차장 이용',
        lat: 37.5296,
        lng: 126.9647
    }
];

/* =========================================
   2. 아코디언 렌더링
========================================= */
function renderAccordion() {
    const list = document.getElementById('storeAccordionList');
    if (!list) return;

    const fragment = document.createDocumentFragment();

    storeData.forEach(function (store, index) {
        const li = document.createElement('li');
        li.className = 'store-accordion-item';
        li.setAttribute('data-index', index);

        const kakaoMapUrl =
            'https://map.kakao.com/link/search/' + encodeURIComponent(store.address);

        li.innerHTML =
            '<button type="button" class="store-accordion-trigger" ' +
                'aria-expanded="false" ' +
                'aria-controls="store-panel-' + index + '" ' +
                'id="store-trigger-' + index + '">' +
                '<span class="store-name ft-28-r color-point">' + store.name + '</span>' +
                '<span class="store-address-preview ft-20-r color-main" aria-hidden="true">' + store.address + '</span>' +
                '<span class="store-accordion-icon" aria-hidden="true">' +
                    '<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
                '</span>' +
            '</button>' +
            '<div class="store-accordion-panel" ' +
                'id="store-panel-' + index + '" ' +
                'role="region" ' +
                'aria-labelledby="store-trigger-' + index + '">' +
                '<div class="store-detail">' +
                    '<div class="store-detail-item">' +
                        '<span class="store-detail-label ft-18-r color-orange">주소</span>' +
                        '<span class="store-detail-value ft-20-r color-point">' + store.address + '</span>' +
                    '</div>' +
                    '<div class="store-detail-item">' +
                        '<span class="store-detail-label ft-18-r color-orange">전화번호</span>' +
                        '<span class="store-detail-value ft-20-r color-point">' + store.tel + '</span>' +
                    '</div>' +
                    '<div class="store-detail-item">' +
                        '<span class="store-detail-label ft-18-r color-orange">영업시간</span>' +
                        '<span class="store-detail-value ft-20-r color-point">' + store.hours + '</span>' +
                    '</div>' +
                    '<div class="store-detail-item">' +
                        '<span class="store-detail-label ft-18-r color-orange">주차</span>' +
                        '<span class="store-detail-value ft-20-r color-point">' + store.parking + '</span>' +
                    '</div>' +
                    '<div class="store-detail-item">' +
                        '<span class="store-detail-label ft-18-r color-orange">지도</span>' +
                        '<a href="' + kakaoMapUrl + '" target="_blank" rel="noopener noreferrer" class="store-map-link ft-20-r">' +
                            '카카오맵에서 보기' +
                            '<svg viewBox="0 0 24 24"><line x1="7" y1="17" x2="17" y2="7"></line>' +
                            '<polyline points="7 7 17 7 17 17"></polyline></svg>' +
                        '</a>' +
                    '</div>' +
                '</div>' +
            '</div>';

        fragment.appendChild(li);
    });

    list.appendChild(fragment);
    bindAccordion();
}

/* =========================================
   3. 아코디언 이벤트 바인딩
========================================= */
function bindAccordion() {
    const items = document.querySelectorAll('.store-accordion-item');

    items.forEach(function (item) {
        const trigger = item.querySelector('.store-accordion-trigger');
        const panel = item.querySelector('.store-accordion-panel');
        if (!trigger || !panel) return;

        trigger.addEventListener('click', function () {
            const isOpen = item.classList.contains('is-open');

            // 다른 열린 항목 닫기
            items.forEach(function (other) {
                if (other !== item && other.classList.contains('is-open')) {
                    closeItem(other);
                }
            });

            // 현재 항목 토글
            if (isOpen) {
                closeItem(item);
            } else {
                openItem(item);
            }
        });

        // 키보드 접근성
        trigger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger.click();
            }
        });
    });
}

function revealAccordionPanel(item) {
    var panel = item.querySelector('.store-accordion-panel');
    if (!panel) {
        return;
    }

    function scrollIfNeeded() {
        var header = document.querySelector('.header');
        var headerHeight = header ? header.offsetHeight : 0;
        var rect = panel.getBoundingClientRect();

        if (rect.top < headerHeight + 8 || rect.bottom > window.innerHeight - 16) {
            item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }

    panel.addEventListener('transitionend', function onEnd(e) {
        if (e.propertyName !== 'max-height') {
            return;
        }

        panel.removeEventListener('transitionend', onEnd);
        scrollIfNeeded();
    });

    requestAnimationFrame(scrollIfNeeded);
}

function openItem(item) {
    const trigger = item.querySelector('.store-accordion-trigger');
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    revealAccordionPanel(item);
}

function closeItem(item) {
    const trigger = item.querySelector('.store-accordion-trigger');
    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
}

/* =========================================
   4. 지도 패널 — 좌측 검색·목록 + 카카오맵
========================================= */
var storeMapState = {
    activeIndex: -1,
    filterText: '',
    markerImage: null
};

function getFilteredStoreIndices(filterText) {
    var query = (filterText || '').trim().toLowerCase();

    if (!query) {
        return storeData.map(function (_, index) {
            return index;
        });
    }

    return storeData.reduce(function (indices, store, index) {
        var name = store.name.toLowerCase();
        var address = store.address.toLowerCase();

        if (name.indexOf(query) !== -1 || address.indexOf(query) !== -1) {
            indices.push(index);
        }

        return indices;
    }, []);
}

function createMarkerImage() {
    if (storeMapState.markerImage) {
        return storeMapState.markerImage;
    }

    var svgMarker =
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">' +
            '<path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 26 16 26S32 26.5 32 16C32 7.163 24.837 0 16 0z" fill="#D4734A"/>' +
            '<circle cx="16" cy="16" r="6" fill="#fff"/>' +
        '</svg>';
    var svgBlob = new Blob([svgMarker], { type: 'image/svg+xml' });
    var svgUrl = URL.createObjectURL(svgBlob);
    var markerImageSize = new kakao.maps.Size(32, 42);
    var markerImageOption = { offset: new kakao.maps.Point(16, 42) };

    storeMapState.markerImage = new kakao.maps.MarkerImage(svgUrl, markerImageSize, markerImageOption);
    return storeMapState.markerImage;
}

function setSidebarActive(index) {
    var items = document.querySelectorAll('.store-item');

    items.forEach(function (item) {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
    });

    storeMapState.activeIndex = index;

    if (index < 0) {
        return;
    }

    var target = document.querySelector('.store-item[data-index="' + index + '"]');
    if (target) {
        target.classList.add('is-active');
        target.setAttribute('aria-selected', 'true');
    }
}

function ensureSidebarShowsStore(index) {
    if (index < 0 || index >= storeData.length) {
        setSidebarActive(-1);
        return;
    }

    storeMapState.activeIndex = index;

    var indices = getFilteredStoreIndices(storeMapState.filterText);
    if (indices.indexOf(index) === -1) {
        storeMapState.filterText = '';
        var input = document.getElementById('store-search-input');
        if (input) {
            input.value = '';
        }
        renderSidebarList('');
        updateMarkerVisibility(getFilteredStoreIndices(''));
    } else {
        setSidebarActive(index);
    }

    var target = document.querySelector('.store-item[data-index="' + index + '"]');
    if (target) {
        target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

function focusStoreOnMap(index, level) {
    var map = window._kakaoMap;
    var marker = window._storeMarkers && window._storeMarkers[index];

    if (!map || !marker) {
        return;
    }

    map.panTo(marker.getPosition());
    map.setLevel(level, { animate: true });
}

function fitMapToIndices(indices) {
    var map = window._kakaoMap;

    if (!map || !indices.length) {
        return;
    }

    if (indices.length === 1) {
        focusStoreOnMap(indices[0], 5);
        return;
    }

    var bounds = new kakao.maps.LatLngBounds();

    indices.forEach(function (index) {
        var marker = window._storeMarkers[index];
        if (marker) {
            bounds.extend(marker.getPosition());
        }
    });

    map.setBounds(bounds);
}

function updateMarkerVisibility(indices) {
    if (!window._storeMarkers) {
        return;
    }

    var map = window._kakaoMap;
    var visibleSet = {};

    indices.forEach(function (index) {
        visibleSet[index] = true;
    });

    window._storeMarkers.forEach(function (marker, index) {
        marker.setMap(visibleSet[index] ? map : null);
    });
}

function renderSidebarList(filterText) {
    var listEl = document.getElementById('storeSidebarList');
    var emptyEl = document.getElementById('storeSearchEmpty');

    if (!listEl) {
        return [];
    }

    var indices = getFilteredStoreIndices(filterText);
    listEl.innerHTML = '';

    if (!indices.length) {
        listEl.hidden = true;
        if (emptyEl) {
            emptyEl.hidden = false;
        }
        storeMapState.activeIndex = -1;
        return indices;
    }

    listEl.hidden = false;
    if (emptyEl) {
        emptyEl.hidden = true;
    }

    var fragment = document.createDocumentFragment();

    indices.forEach(function (index) {
        var store = storeData[index];
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'store-item';
        button.setAttribute('data-index', String(index));
        button.setAttribute('role', 'option');
        button.setAttribute('aria-selected', 'false');

        button.innerHTML =
            '<span class="store-item-name">' + store.name + '</span>' +
            '<span class="store-item-address">' + store.address + '</span>';

        button.addEventListener('click', function () {
            ensureSidebarShowsStore(index);
            focusStoreOnMap(index, 3);
        });

        fragment.appendChild(button);
    });

    listEl.appendChild(fragment);

    if (storeMapState.activeIndex !== -1 && indices.indexOf(storeMapState.activeIndex) === -1) {
        storeMapState.activeIndex = -1;
    }

    if (storeMapState.activeIndex !== -1) {
        setSidebarActive(storeMapState.activeIndex);
    }

    return indices;
}

function bindStoreSearch() {
    var input = document.getElementById('store-search-input');

    if (!input) {
        return;
    }

    input.addEventListener('input', function () {
        storeMapState.filterText = input.value;
        var indices = renderSidebarList(storeMapState.filterText);
        updateMarkerVisibility(indices);
        fitMapToIndices(indices);
    });
}

function initMapPanel() {
    if (typeof kakao === 'undefined' || !kakao.maps) {
        return;
    }

    kakao.maps.load(function () {
        var container = document.getElementById('map-container');
        if (!container) {
            return;
        }

        var map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(36.5, 127.8),
            level: 13
        });

        window._kakaoMap = map;
        window._storeMarkers = [];

        var markerImage = createMarkerImage();

        storeData.forEach(function (store, index) {
            var position = new kakao.maps.LatLng(store.lat, store.lng);
            var marker = new kakao.maps.Marker({
                map: map,
                position: position,
                title: store.name,
                image: markerImage
            });

            var infowindow = new kakao.maps.InfoWindow({
                content:
                    '<div style="' +
                        'padding:8px 12px;' +
                        'font-size:13px;' +
                        'font-family:Pretendard,sans-serif;' +
                        'color:#1E2022;' +
                        'font-weight:600;' +
                        'white-space:nowrap;' +
                    '">' + store.name + '</div>'
            });

            kakao.maps.event.addListener(marker, 'mouseover', function () {
                infowindow.open(map, marker);
            });
            kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close();
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                ensureSidebarShowsStore(index);
                focusStoreOnMap(index, 3);
            });

            window._storeMarkers.push(marker);
        });

        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        renderSidebarList('');
        bindStoreSearch();
        setSidebarActive(0);
        fitMapToIndices(getFilteredStoreIndices(''));
    });
}

/* =========================================
   5. 초기화 (헤더 — common.js + include.js)
========================================= */
document.addEventListener('DOMContentLoaded', function () {
    renderAccordion();
    initMapPanel();
});
