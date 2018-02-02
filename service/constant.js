const constant = {
    fullSql : 'SELECT U.id AS userId, ' +
    'U.nickname, U.profile_img, ' +
    'P.id AS feed_id, P.calorie, P.content, ' +
    'GROUP_CONCAT(distinct PI.img_url) AS img_url, ' +
    'GROUP_CONCAT(distinct H.name) AS hashtags ' +
    'FROM post P JOIN user U ON U.id=P.user_id ' +
    'JOIN post_image PI ON P.id=PI.post_id ' +
    'JOIN hashtag H ON P.id=H.post_id ' +
    'WHERE U.nickname=? ' +
    'AND (P.calorie BETWEEN ? AND ?) ' +
    'GROUP BY P.id ' +
    'Having Find_In_Set(?,hashtags) ' +
    'LIMIT 0, 1000;',
    omitTagSql : 'SELECT U.id AS userId, ' +
    'U.nickname, U.profile_img, ' +
    'P.id AS feed_id, P.calorie, P.content, ' +
    'GROUP_CONCAT(distinct PI.img_url) AS img_url, ' +
    'GROUP_CONCAT(distinct H.name) AS hashtags ' +
    'FROM post P JOIN user U ON U.id=P.user_id ' +
    'JOIN post_image PI ON P.id=PI.post_id ' +
    'JOIN hashtag H ON P.id=H.post_id ' +
    'WHERE U.nickname=? ' +
    'AND (P.calorie BETWEEN ? AND ?) ' +
    'GROUP BY P.id ' +
    'LIMIT 0, 1000;',
    omitNameSql : 'SELECT U.id AS userId, ' +
    'U.nickname, U.profile_img, ' +
    'P.id AS feed_id, P.calorie, P.content, ' +
    'GROUP_CONCAT(distinct PI.img_url) AS img_url, ' +
    'GROUP_CONCAT(distinct H.name) AS hashtags ' +
    'FROM post P JOIN user U ON U.id=P.user_id ' +
    'JOIN post_image PI ON P.id=PI.post_id ' +
    'JOIN hashtag H ON P.id=H.post_id ' +
    'AND (P.calorie BETWEEN ? AND ?) ' +
    'GROUP BY P.id ' +
    'Having Find_In_Set(?,hashtags) ' +
    'LIMIT 0, 1000;',
    onlyKalSql : 'SELECT U.id AS userId, ' +
    'U.nickname, U.profile_img, ' +
    'P.id AS feed_id, P.calorie, P.content, ' +
    'GROUP_CONCAT(distinct PI.img_url) AS img_url, ' +
    'GROUP_CONCAT(distinct H.name) AS hashtags ' +
    'FROM post P JOIN user U ON U.id=P.user_id ' +
    'JOIN post_image PI ON P.id=PI.post_id ' +
    'JOIN hashtag H ON P.id=H.post_id ' +
    'WHERE (P.calorie BETWEEN ? AND ?) ' +
    'GROUP BY P.id ' +
    'LIMIT 0, 1000;'
};


export default constant;

//TODO 이거 어떻게 줄일까? -- 로직 이렇게, 쿼리 미리 작성 안해놓는 방법으로 생각.?
//TODO ****** 문자 "," 이거는 선택이 안된다. 왜이러지? **********

//TODO Problem :: WHERE 와 Having
/**
 *  Reference ::
 *  https://www.w3resource.com/mysql/string-functions/mysql-find_in_set-function.php
 *  http://www.gurubee.net/lecture/1032
 *  https://wikidocs.net/3943
 */






// SELECT     client.id, client.name, GROUP_CONCAT(module.name) AS modules
// FROM       client
// LEFT JOIN  client_module ON client_module.client_id = client.id
// LEFT JOIN  module ON module.id = client_module.module.id
// WHERE      module.id IN (1,2)
//
// ``
// SELECT     client.id, client.name, GROUP_CONCAT(module.name) AS modules
// FROM       client
// LEFT JOIN  client_module ON client_module.client_id = client.id
// LEFT JOIN  module ON module.id = client_module.module_id
// group by client.id Having Find_In_Set('module1',modules)>0 or Find_In_Set('module2',modules)>0

//
// SELECT U.id AS userId,
// U.nickname, U.profile_img,
// P.id AS feed_id,
// P.calorie, P.content,
// GROUP_CONCAT(distinct PI.img_url) AS img_url,
// GROUP_CONCAT(distinct H.name) AS hashtags
// FROM post P JOIN user U ON U.id=P.user_id
// JOIN post_image PI ON P.id=PI.post_id
// JOIN hashtag H ON P.id=H.post_id
// WHERE (P.calorie BETWEEN ? AND ?)
// GROUP BY P.id LIMIT 0, 1000;


