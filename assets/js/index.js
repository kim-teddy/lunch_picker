// FOOD TYPE Const
const FOOD_TYPE_KOREAN = "korean";
const FOOD_TYPE_JAPANESE = "japanese"
const FOOD_TYPE_CHINESE = "chinese";
const FOOD_TYPE_FASTFOOD = "fastfood";

const list = [
    {
        type: FOOD_TYPE_FASTFOOD,
        item: [
            "맥도날드",
            "롯데리아",
            "서브웨이",
            "버거킹",
            "샐러디",
        ]
    },
    {
        type: FOOD_TYPE_CHINESE,
        item: [
            "천용",
            "예림",
            "마라테이블",
        ]
    },
    {
        type: FOOD_TYPE_KOREAN,
        item: [
            "수랏간",
            "명동칼국수샤브샤브",
            "매반생면",
            "백암순대/감자탕",
            "복이네",
            "신의주순대와 쭈꾸미",
            "천하일품추어탕",
            "깐부치킨",
        ],
    },
    {
        type: FOOD_TYPE_JAPANESE,
        item: [
            "지구당",
        ],
    }
];

const result = [];

const shuffleArray = (array) => {
    // array.sort(() => Math.random() - 1);
    for (let index = array.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
    }
}

const composeRandomList = () => {
    // 초기화
    result.length = 0;

    list.forEach(category => {
        category.item.forEach(item => {
            result.push({
                type: category.type,
                name: item.toString(),
            });
        })
    })

    shuffleArray(result);
}

const renderRandomList = () => {
    const container = document.querySelector(".slot-machine__container .list");
    const template = document.querySelector("#slot-item__template").innerHTML;

    let html = '';
    for (let i = 0; i < result.length; i++) {
        html += template
            .replace(/{type}/g, result[i].type)
            .replace(/{name}/g, result[i].name);
    }

    container.innerHTML = html;

    container.classList.remove("rolling");
    setTimeout(() => {
        container.classList.add("rolling");
    }, 0);
}

const getRandomResult = () => {
    result.length = 0;

    // Random Result Set
    let resultCount = 0;
    const resultMaxSize = 5;

    while (resultCount < resultMaxSize) {
        const randomTypeValue = list[Math.floor(Math.random() * list.length)];
        const targetType = randomTypeValue.type;
        const targetItem = randomTypeValue.item;

        const pickedItem = targetItem[Math.floor(Math.random() * targetItem.length)];

        // 같은 타입의 음식이 2개까지만 선택되도록 예외 처리
        const checkDuplicateType = result.filter(item => {
            return item.type === targetType;
        });

        if (checkDuplicateType.length > 1) {
            continue;
        }

        // 동일 식당은 결과에서 제외하는 로직
        const checkDuplicateItem = result.filter(item => {
            return item.type === targetType && item.name === pickedItem;
        });

        if (checkDuplicateItem.length > 0) {
            continue;
        }

        result.push({
            type: targetType,
            name: pickedItem,
        });

        resultCount++;
    }

    result.sort((a, b) => {
        return a.type === b.type ? 0 : 1;
    });
}

const renderRandomResult = () => {
    const container = document.querySelector('.container .content');
    const template = document.querySelector('#item__template').innerHTML;

    let html = '';
    for (let i = 0; i < result.length; i++) {
        html += template
            .replace(/{type}/g, result[i].type)
            .replace(/{name}/g, result[i].name);
    }

    container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function() {
    const refreshButton = document.querySelector('.container .refresh-button');
    refreshButton.addEventListener("click", () => {
        composeRandomList();
        renderRandomList();
    });
});