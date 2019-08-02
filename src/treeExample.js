var exampletree = [
  {
    "name": "1",
    "value": "택시 불러줘",
    "bot": false,
    "parent": "null",
    "children": [
      {
        "name": "11",
        "value": "어디까지 갈 예정이야?",
        "bot": true,
        "parent": "1",
        "children": [
          {
            "name": "111",
            "value": "나 대전역까지 갈거야",
            "bot": false,
            "parent": "11",
            "children": [
              {
                "name": "1111",
                "value": "알았어! 가능한 택시가 있는지 알아볼게",
                "bot": true,
                "parent": "111",
              },
              {
                "name": "1112",
                "value": "언제 출발할 예정이야?",
                "bot": true,
                "parent": "111",
                "children": [
                    {
                      "name": "11121",
                      "value": "나 4시쯤 출발해야될 것 같아.",
                      "bot": false,
                      "parent": "1112"
                    }
                ]
              },
              {
                "name": "1113",
                "value": "혹시 몇 명이 탈거야?",
                "bot": true,
                "parent": "111",
                "children": [
                      {
                      "name": "11131",
                      "value": "3명!",
                      "bot": false,
                      "parent": "1113"
                      }
                  ]
              },
              {
                "name": "1114",
                "value": "언제 필요해?",
                "bot": true,
                "parent": "111",
                "children": [
                      {
                      "name": "11141",
                      "value": "5분 이따가 나가려고",
                      "bot": false,
                      "parent": "1114"
                      }
                  ]
              }
            ]
          }
        ]
      },
      {
        "name": "12",
        "value": "현재 위치 알려줘",
        "bot": true,
        "parent": "1",
        "children": [
          {
            "name": "121",
            "value": "어은동 한빛아파트 201동이야.",
            "bot": false,
            "parent": "12",
            "children": [
                  {
                      "name": "1211",
                      "value": "어느 방향으로 가는 택시 불러줄까?",
                      "bot": true,
                      "parent": "121",
                      "children": [
                          {
                              "name": "12111",
                              "value": "대전역으로 가야해",
                              "bot": false,
                              "parent": "1211",
                          }
                      ]
                  },
                  {
                      "name": "1212",
                      "value": "언제 필요해?",
                      "bot": true,
                      "parent": "121",
                      "children": [
                          {
                              "name": "1212",
                              "value": "5분 이따가 불러줘",
                              "bot": false,
                              "parent": "1212",
                          }
                      ]
                  }
              ]
          }
        ]
      }
    ]
  }
];

export default exampletree;