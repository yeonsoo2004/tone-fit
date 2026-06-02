/* =========================================
   TONE:FIT Store Page Script (store.js)
========================================= */

/* =========================================
   1. 매장 데이터
========================================= */
const STORE_DATA = [
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

    STORE_DATA.forEach(function (store, index) {
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

function openItem(item) {
    const trigger = item.querySelector('.store-accordion-trigger');
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');

    // 해당 매장 마커로 지도 이동 + 확대
    const index = parseInt(item.getAttribute('data-index'), 10);
    if (!isNaN(index) && window._storeMarkers && window._storeMarkers[index]) {
        const marker = window._storeMarkers[index];
        const map = window._kakaoMap;
        if (map) {
            map.setLevel(4, { animate: true });          // 레벨 4로 확대 (숫자 낮을수록 더 확대)
            map.panTo(marker.getPosition());             // 해당 마커 위치로 이동
        }
    }
}

function closeItem(item) {
    const trigger = item.querySelector('.store-accordion-trigger');
    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');

    // 열린 항목이 하나도 없으면 전국 뷰로 복귀
    const anyOpen = document.querySelector('.store-accordion-item.is-open');
    if (!anyOpen && window._kakaoMap) {
        window._kakaoMap.setLevel(13, { animate: true });
        window._kakaoMap.panTo(new kakao.maps.LatLng(36.5, 127.8));
    }
}

/* =========================================
   4. 카카오맵 초기화
========================================= */
function initKakaoMap() {
    kakao.maps.load(function () {
        const container = document.getElementById('kakao-map');
        if (!container) return;

        const options = {
            center: new kakao.maps.LatLng(36.5, 127.8), // 한국 중심
            level: 13
        };

        const map = new kakao.maps.Map(container, options);
        window._kakaoMap = map;
        window._storeMarkers = [];

        // 커스텀 마커 이미지 — 브랜드 주황색 SVG 핀
        const svgMarker = `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 26 16 26S32 26.5 32 16C32 7.163 24.837 0 16 0z"
                    fill="#D4734A"/>
                <circle cx="16" cy="16" r="6" fill="#fff"/>
            </svg>
        `;
        const svgBlob = new Blob([svgMarker], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const markerImageSize = new kakao.maps.Size(32, 42);
        const markerImageOption = { offset: new kakao.maps.Point(16, 42) };
        const markerImage = new kakao.maps.MarkerImage(svgUrl, markerImageSize, markerImageOption);

        STORE_DATA.forEach(function (store, index) {
            const position = new kakao.maps.LatLng(store.lat, store.lng);

            const marker = new kakao.maps.Marker({
                map: map,
                position: position,
                title: store.name,
                image: markerImage
            });

            // 인포윈도우
            const infowindow = new kakao.maps.InfoWindow({
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

            // 마커 클릭 시 해당 아코디언 열기
            kakao.maps.event.addListener(marker, 'click', function () {
                const items = document.querySelectorAll('.store-accordion-item');
                if (items[index]) {
                    // 다른 항목 닫기
                    items.forEach(function (other) {
                        if (other !== items[index] && other.classList.contains('is-open')) {
                            closeItem(other);
                        }
                    });
                    openItem(items[index]);
                    items[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });

            window._storeMarkers.push(marker);
        });

        // 지도 컨트롤 추가
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    });
}

/* =========================================
   5. 헤더 스크롤 처리 (서브페이지 — 항상 배경 표시)
========================================= */
(function () {
    const header = document.querySelector('.header');
    if (!header) return;
    // store 페이지는 히어로 배경이 없으므로 항상 scrolled 상태 유지
    header.classList.add('is-scrolled');

    const headerMenu = header.querySelector('.header-menu');
    const headerNav = header.querySelector('.header-nav');
    const closeDelay = 120;
    let closeTimer = null;

    function setMegaOpen(isOpen) {
        header.classList.toggle('is-mega-open', isOpen);
        if (headerNav) {
            headerNav.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
    }

    if (headerMenu) {
        headerMenu.addEventListener('mouseenter', function () {
            clearTimeout(closeTimer);
            setMegaOpen(true);
        });
        headerMenu.addEventListener('mouseleave', function () {
            closeTimer = setTimeout(function () { setMegaOpen(false); }, closeDelay);
        });
        headerMenu.addEventListener('focusin', function () {
            clearTimeout(closeTimer);
            setMegaOpen(true);
        });
        headerMenu.addEventListener('focusout', function (e) {
            if (!headerMenu.contains(e.relatedTarget)) {
                closeTimer = setTimeout(function () { setMegaOpen(false); }, closeDelay);
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            clearTimeout(closeTimer);
            setMegaOpen(false);
        }
    });
})();

/* =========================================
   6. 초기화
========================================= */
document.addEventListener('DOMContentLoaded', function () {
    renderAccordion();
    initKakaoMap();
});
