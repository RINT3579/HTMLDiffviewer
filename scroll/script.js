// 簡単な実装（同じ大きさのエレメントにしか利用できない）
// エレメントを取得
const s1 = document.getElementById("s1");
const s2 = document.getElementById("s2");
// エレメントがスクロールされたときの関数。
s1.addEventListener("scroll", () => {
    s2.scrollTop = s1.scrollTop;
});

s2.addEventListener("scroll", () => {
    s1.scrollTop = s2.scrollTop;
});

// 少々複雑な実装（エレメントのサイズが違うものでも対応可
// クラスscroll_syncを持たせたエレメントを纏めて取得
const scroll_sync = document.getElementsByClassName("scroll_sync");
const length = scroll_sync.length;

// ここから先のfor文でエレメント1つ1つに関数をセットする。
for (let i = 0; i < length; i++) {
    // 関数のセット対象のエレメント
    const base_element = scroll_sync[i];

    // スクロール時に動作する関数をセットする。
    base_element.addEventListener("scroll", () => {
        // スクロール位置の比率を求める
        const scrollRatio = base_element.scrollTop /
            (base_element.scrollHeight - base_element.clientHeight);
        for (let j = 0; j < length; j++) {
            // 自分自身とは連動しないようにcontinueで回避
            if (i == j) continue;
            const target_element = scroll_sync[j];
            target_element.scrollTop =
                (target_element.scrollHeight - target_element.clientHeight) *
                scrollRatio;
        }
    });
}