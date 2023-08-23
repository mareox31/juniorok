$(document).ready(() => {
    addListenerToCard();

    let keyword = '';
    let checkedSkills = [];

    $('#skillsContainer').on('change', 'input[type="checkbox"]', function () {
        checkedSkills.length = 0;
        $("#skillsContainer input:checkbox:checked").each(function() {
            checkedSkills.push($(this).val());
        });
        requestPostList();
    });

    // , #skillsContainer label
    $('#search-button').click(function () {
        // 검색 키워드 불러오기
        keyword = $("#keyword").val();
        requestPostList();

    });

    function requestPostList() {
        // 선택된 스킬 목록 불러오기
        let checkedSkillsString = checkedSkills.join(',');
        // 조건에 맞는 공고 검색
        requestPostListAjax(keyword.toLowerCase(), checkedSkillsString);
    }

    function requestPostListAjax(keyword, skills) {
        $.ajax({
            url: `/post/list?keyword=${keyword}&skills=${skills}`,
            type: 'GET',
            contentType: 'application/html',
            headers: {
                'X-CSRF-TOKEN': $('input[name="_csrf"]').val(),
            },
            success: function (xhr, status, response) {
                $('#postListContainer').empty().append(response.responseText);
                addListenerToCard();
            },
            error: function (xhr, status, error) {
                alert('오류가 발생하였습니다. 나중에 다시 시도해주세요.');
            }
        });
    }

    function addListenerToCard() {
        $(".card").on("click", function() {
            let postId = $(this).find("input[type='hidden']").val();
            requestPostDetail(postId, "GET")
        });
    }

    function requestPostDetail(resource, method) {
        $.ajax({
            url: `/post/${resource}`,
            type: method,
            contentType: 'application/html',
            headers: {
                'X-CSRF-TOKEN': $('input[name="_csrf"]').val(),
            },
            success: function (xhr, status, response) {
                $('.modal-content').empty().append(response.responseText);
            },
            error: function (xhr, status, error) {
                alert('오류가 발생하였습니다. 나중에 다시 시도해주세요.');
            }
        });
    }
})