import moment from "moment";
import { ILog, ILogGet, IVersion } from "./interface";
import { logsService } from "./../services/logsService";
import {
  SET_LOGS,
  SET_TREE,
  SET_VERSION,
  SET_VERSIONS,
  SET_VERSION_TREE,
} from "./mutation-types";
import { Module } from "vuex";
import Vue from "vue";
import { ITree } from "./interfaces";

const dump = [
  {
    id: 1,
    admin: 4,
    dateTime: "2021-10-22T15:54:49.000+00:00",
    action: "�׫�x",
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 2,
    admin: 40,
    dateTime: "2021-11-09T08:59:09.847+00:00",
    action:
      '{"Создано ":{"textKz":"test_name_K_0006_абв","textRu":"test_name_R_0006_абв","textEng":"test_name_E_0006_абв"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 3,
    admin: 40,
    dateTime: "2021-11-09T09:26:41.885+00:00",
    action:
      '{"Создано ":{"textKz":"test_name_K_0006_абв","textRu":"test_name_R_0006_абв","textEng":"test_name_E_0006_абв"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 4,
    admin: 40,
    dateTime: "2021-11-09T09:27:52.471+00:00",
    action:
      '{"Создано ":{"textKz":"test_name_K_0006_абв","textRu":"test_name_R_0006_абв","textEng":"test_name_E_0006_абв"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 5,
    admin: 40,
    dateTime: "2021-11-09T09:30:16.670+00:00",
    action:
      '{"Создано ":{"textKz":"test_name_K_0007_абв","textRu":"test_name_R_0007_абв","textEng":"test_name_E_0007_абв"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 6,
    admin: 40,
    dateTime: "2021-11-09T09:41:30.050+00:00",
    action:
      '{"Создано ":{"textKz":"test_name_K_0007_абв","textRu":"test_name_R_0007_абв","textEng":"test_name_E_0007_абв"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 7,
    admin: 40,
    dateTime: "2021-11-09T12:03:53.245+00:00",
    action:
      '{"Создано ":{"textKz":"ГО Юристказ","textRu":"ГО Юрист","textEng":"GO Law"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 8,
    admin: 40,
    dateTime: "2021-11-09T12:12:27.720+00:00",
    action:
      '{"Создано ":{"textKz":"test_name_K_0007_абв","textRu":"test_name_R_0007_абв","textEng":"test_name_E_0007_абв"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 9,
    admin: 40,
    dateTime: "2021-11-09T12:15:11.020+00:00",
    action:
      '{"Создано ":{"textKz":"test_name_K_0007_абв","textRu":"test_name_R_0007_абв","textEng":"test_name_E_0007_абв"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 10,
    admin: 40,
    dateTime: "2021-11-09T12:23:17.043+00:00",
    action:
      '{"Создано ":{"textKz":"д д д ::3","textRu":"д ::3","textEng":"д д д д ::3"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 11,
    admin: 40,
    dateTime: "2021-11-09T12:33:32.803+00:00",
    action:
      '{"Создано ":{"textKz":"krngklkrngkl::8","textRu":"krngkl::8","textEng":"krngklkrngklkrngkl::8"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 12,
    admin: 40,
    dateTime: "2021-11-09T12:34:16.251+00:00",
    action:
      '{"Создано ":{"textKz":"Отдел юристовказ::46","textRu":"Отдел юристов::46","textEng":"Law Dep::46"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 13,
    admin: 40,
    dateTime: "2021-11-09T12:34:29.371+00:00",
    action:
      '{"Создано ":{"textKz":"Юристказ::46","textRu":"Юрист::46","textEng":"Lawyer::46"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 15,
    admin: 40,
    dateTime: "2021-11-09T12:44:26.298+00:00",
    action:
      '{"Создано ":{"textKz":"test_name_K_0007_абв","textRu":"test_name_R_0007_абв","textEng":"test_name_E_0007_абв"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 16,
    admin: 40,
    dateTime: "2021-11-09T12:47:06.555+00:00",
    action:
      '{"Создано ":{"textKz":"лоырало","textRu":"выпавына","textEng":"jkdfn"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 17,
    admin: 40,
    dateTime: "2021-11-09T13:14:02.025+00:00",
    action:
      '{"Создано ":{"textKz":"dskvndskvn::31","textRu":"dskvn::31","textEng":"dskvndskvndskvn::31"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 18,
    admin: 40,
    dateTime: "2021-11-09T13:17:45.129+00:00",
    action:
      '{"Создано ":{"textKz":"mbfmbf::40","textRu":"mbf::40","textEng":"mbfmbfmbfmbf::40"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 19,
    admin: 40,
    dateTime: "2021-11-09T13:17:57.863+00:00",
    action:
      '{"Создано ":{"textKz":"fm,dvfm,dv::40","textRu":"fm,dv::40","textEng":"fm,dvfm,dvfm,dv::40"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 20,
    admin: 40,
    dateTime: "2021-11-09T13:27:35.840+00:00",
    action:
      '{"Создано ":{"textKz":"jfdnkjfajfdnkjfa::45","textRu":"jfdnkjfa::45","textEng":"jfdnkjfajfdnkjfajfdnkjfa::45"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 21,
    admin: 40,
    dateTime: "2021-11-09T13:27:50.722+00:00",
    action:
      '{"Создано ":{"textKz":"fgnbkfgnbk::45","textRu":"fgnbk::45","textEng":"fgnbkfgnbkfgnbk::45"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 22,
    admin: 40,
    dateTime: "2021-11-09T13:31:11.172+00:00",
    action:
      '{"Создано ":{"textKz":"fnvfnv::42","textRu":"fnv::42","textEng":"fnvfnvfnv::42"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 23,
    admin: 40,
    dateTime: "2021-11-09T13:31:21.714+00:00",
    action:
      '{"Создано ":{"textKz":"fnbjfnfnbjfn::42","textRu":"fnbjfn::42","textEng":"fnbjfnfnbjfnfnbjfn::42"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 24,
    admin: 40,
    dateTime: "2021-11-09T13:35:41.149+00:00",
    action:
      '{"Создано ":{"textKz":"jntrgjkjntrgjk::8","textRu":"jntrgjk::8","textEng":"jntrgjkjntrgjkjntrgjk::8"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 25,
    admin: 40,
    dateTime: "2021-11-09T13:36:00.592+00:00",
    action:
      '{"Создано ":{"textKz":"fjgnfjgn::44","textRu":"fjgn::44","textEng":"fjgnfjgnfjgn::44"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 26,
    admin: 40,
    dateTime: "2021-11-09T13:36:12.207+00:00",
    action:
      '{"Создано ":{"textKz":"sdmvnasdmvnasdmvna::44","textRu":"sdmvna::44","textEng":"sdmvnasdmvna::44"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 27,
    admin: 40,
    dateTime: "2021-11-09T13:38:20.788+00:00",
    action:
      '{"Создано ":{"textKz":"dvndvn::47","textRu":"dvn::47","textEng":"dvndvndvn::47"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 28,
    admin: 40,
    dateTime: "2021-11-09T13:38:29.272+00:00",
    action:
      '{"Создано ":{"textKz":"dvnkldvnkldvnkl::47","textRu":"dvnkl::47","textEng":"dvnkldvnkldvnkldvnkl::47"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 29,
    admin: 40,
    dateTime: "2021-11-09T13:39:18.778+00:00",
    action:
      '{"Создано ":{"textKz":"mnmn::47","textRu":"mn::47","textEng":"m::47"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 30,
    admin: 40,
    dateTime: "2021-11-09T15:56:40.445+00:00",
    action:
      '{"Создано ":{"textKz":"jkljjklj::37","textRu":"jklj::37","textEng":"jkljjkljjklj::37"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 31,
    admin: 40,
    dateTime: "2021-11-09T21:25:24.659+00:00",
    action:
      '{"Создано ":{"textKz":"dvnkldvnkl::47","textRu":"dvnkl::47","textEng":"dvnkldvnkldvnkl::47"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 33,
    admin: 40,
    dateTime: "2021-11-09T21:31:21.882+00:00",
    action:
      '{"Создано ":{"textKz":"fdvnjfdvnj::47","textRu":"fdvnj::47","textEng":"fdvnjfdvnjfdvnj::47"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 34,
    admin: 40,
    dateTime: "2021-11-09T21:31:49.174+00:00",
    action:
      '{"Создано ":{"textKz":"dvndvn::47","textRu":"dvn::47","textEng":"dvndvndvndvn::47"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 35,
    admin: 40,
    dateTime: "2021-11-09T21:56:14.305+00:00",
    action:
      '{"Создано ":{"textKz":"dfbv,dfbv,::48","textRu":"dfbv,::48","textEng":"dfbv,dfbv,dfbv,::48"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 36,
    admin: 40,
    dateTime: "2021-11-09T21:56:27.363+00:00",
    action:
      '{"Создано ":{"textKz":"dfjkbfdfjkbf::48","textRu":"dfjkbf::48","textEng":"dfjkbfdfjkbfdfjkbf::48"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 37,
    admin: 40,
    dateTime: "2021-11-09T21:57:40.852+00:00",
    action:
      '{"Создано ":{"textKz":"ваьибьтваьибьт::7","textRu":"ваьибьт::7","textEng":"ваьибьтваьибьтваьибьт::7"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 38,
    admin: 40,
    dateTime: "2021-11-09T21:57:59.541+00:00",
    action:
      '{"Создано ":{"textKz":"лолололо::4","textRu":"ло::4","textEng":"лоло::4"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 39,
    admin: 40,
    dateTime: "2021-11-09T22:50:24.453+00:00",
    action:
      '{"Создано ":{"textKz":"hyhhyh","textRu":"hyh","textEng":"hyhhyhhyh"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 40,
    admin: 40,
    dateTime: "2021-11-09T22:50:52.166+00:00",
    action:
      '{"Создано ":{"textKz":"test1test1::49","textRu":"test1::49","textEng":"test1test1test1::49"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 41,
    admin: 40,
    dateTime: "2021-11-09T22:51:01.829+00:00",
    action:
      '{"Создано ":{"textKz":"test2test2::49","textRu":"test2::49","textEng":"test2test2test2::49"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 42,
    admin: 40,
    dateTime: "2021-11-09T22:51:12.342+00:00",
    action:
      '{"Создано ":{"textKz":"test4test4::49","textRu":"test4::49","textEng":"test4test4test4::49"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 43,
    admin: 40,
    dateTime: "2021-11-09T22:51:33.451+00:00",
    action:
      '{"Создано ":{"textKz":"test1test1::49","textRu":"test1::49","textEng":"test1test1test1::49"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 45,
    admin: 40,
    dateTime: "2021-11-09T23:13:45.066+00:00",
    action:
      '{"Создано ":{"textKz":"qweqwe","textRu":"qwe","textEng":"qweqweqwe"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 46,
    admin: 40,
    dateTime: "2021-11-09T23:13:59.581+00:00",
    action:
      '{"Создано ":{"textKz":"hyhy::50","textRu":"hy::50","textEng":"hyhyhy::50"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 47,
    admin: 40,
    dateTime: "2021-11-09T23:14:08.407+00:00",
    action:
      '{"Создано ":{"textKz":"lollol::50","textRu":"lol::50","textEng":"lollollol::50"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 48,
    admin: 40,
    dateTime: "2021-11-09T23:14:16.332+00:00",
    action:
      '{"Создано ":{"textKz":"jfdbjfdb::50","textRu":"jfdb::50","textEng":"jfdbjfdbjfdb::50"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 49,
    admin: 40,
    dateTime: "2021-11-09T23:14:36.167+00:00",
    action:
      '{"Создано ":{"textKz":"jfdbjfdb::50","textRu":"jfdb::50","textEng":"jfdbjfdbjfdb::50"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 51,
    admin: 4,
    dateTime: "2021-11-10T14:05:32.484+00:00",
    action:
      '{"Создано ":{"textKz":"ksndflkksndflk::48","textRu":"ksndflk::48","textEng":"ksndflkksndflkksndflk::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 53,
    admin: 4,
    dateTime: "2021-11-10T14:08:06.177+00:00",
    action:
      '{"Создано ":{"textKz":"mnfdjmnfdj::48","textRu":"mnfdj::48","textEng":"mnfdjmnfdjmnfdj::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 54,
    admin: 4,
    dateTime: "2021-11-10T14:08:15.810+00:00",
    action:
      '{"Создано ":{"textKz":"mnfdjmnfdjmnfdj::48","textRu":"mnfdjmnfdj::48","textEng":"mnfdjmnfdjmnfdjmnfdj::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 56,
    admin: 4,
    dateTime: "2021-11-11T07:13:19.124+00:00",
    action: "���",
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 61,
    admin: 4,
    dateTime: "2021-11-11T08:24:11.432+00:00",
    action:
      '{"Создано ":{"textKz":"sdjfhkjsdjfhkj::48","textRu":"sdjfhkj::48","textEng":"sdjfhkjsdjfhkjsdjfhkjsdjfhkj::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 62,
    admin: 4,
    dateTime: "2021-11-11T09:14:29.159+00:00",
    action:
      '{"Создано ":{"textKz":"kdsnflkkdsnflk::48","textRu":"kdsnflk::48","textEng":"kdsnflkkdsnflkkdsnflk::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 63,
    admin: 4,
    dateTime: "2021-11-11T09:17:02.761+00:00",
    action:
      '{"Создано ":{"textKz":"kfnkfn::4","textRu":"kfn::4","textEng":"kfnkfnkfn::4"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 64,
    admin: 4,
    dateTime: "2021-11-11T09:17:35.428+00:00",
    action:
      '{"Создано ":{"textKz":"koko::4","textRu":"ko::4","textEng":"kokoko::4"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 65,
    admin: 4,
    dateTime: "2021-11-11T09:17:44.819+00:00",
    action:
      '{"Создано ":{"textKz":"nbfnbf::4","textRu":"nbf::4","textEng":"nbfnbfnbf::4"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 66,
    admin: 4,
    dateTime: "2021-11-11T11:53:43.086+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: sdjfhkjsdjfhkj::48","textRu":"Михаил Щупаков, назначен(а) на новую должность: sdjfhkj::48","textEng":"Михаил Щупаков, appointed to a new position: sdjfhkjsdjfhkjsdjfhkjsdjfhkj::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 67,
    admin: 4,
    dateTime: "2021-11-12T05:44:51.695+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 68,
    admin: 4,
    dateTime: "2021-11-12T05:44:55.362+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 69,
    admin: 4,
    dateTime: "2021-11-12T05:46:12.902+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 70,
    admin: 4,
    dateTime: "2021-11-12T05:46:24.140+00:00",
    action:
      '{"Создано ":{"textKz":"opopopop::48","textRu":"opop::48","textEng":"opopopopopop::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 71,
    admin: 4,
    dateTime: "2021-11-12T05:53:59.954+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: opopopop","textRu":"Даулет Даулет, назначен(а) на новую должность: opop","textEng":"Даулет Даулет, appointed to a new position: opopopopopop"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 72,
    admin: 4,
    dateTime: "2021-11-12T06:01:46.129+00:00",
    action:
      '{"Создано ":{"textKz":"jerngjjerngj::48","textRu":"jerngj::48","textEng":"jerngjfdv::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 73,
    admin: 4,
    dateTime: "2021-11-12T06:06:49.718+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 74,
    admin: 4,
    dateTime: "2021-11-12T06:06:53.667+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 75,
    admin: 4,
    dateTime: "2021-11-12T06:07:20.907+00:00",
    action:
      '{"Создано ":{"textKz":"sdhjfhsdhjfh::48","textRu":"sdhjfh::48","textEng":"sdhjfhgfr::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 76,
    admin: 4,
    dateTime: "2021-11-12T06:09:23.767+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 77,
    admin: 4,
    dateTime: "2021-11-12T06:09:45.773+00:00",
    action:
      '{"Создано ":{"textKz":"dhfghfddhfghfd::48","textRu":"dhfghfd::48","textEng":"dhfghfdjn::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 78,
    admin: 4,
    dateTime: "2021-11-12T06:14:34.488+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 79,
    admin: 4,
    dateTime: "2021-11-12T06:14:46.592+00:00",
    action:
      '{"Создано ":{"textKz":";plpkl;plpkl::48","textRu":";plpkl::48","textEng":";plpkl;plpkl;plpkl;plpkl::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 80,
    admin: 4,
    dateTime: "2021-11-12T06:16:36.418+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 81,
    admin: 4,
    dateTime: "2021-11-12T06:17:06.411+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 82,
    admin: 4,
    dateTime: "2021-11-12T06:17:09.699+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 83,
    admin: 4,
    dateTime: "2021-11-12T06:17:20.830+00:00",
    action:
      '{"Создано ":{"textKz":"hyhyhhyhyhhyhyh::48","textRu":"hyhyh::48","textEng":"hyhyhhyhyh::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 84,
    admin: 4,
    dateTime: "2021-11-12T06:20:58.933+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 85,
    admin: 4,
    dateTime: "2021-11-12T06:21:19.326+00:00",
    action:
      '{"Создано ":{"textKz":"jujjd::48","textRu":"jujj::48","textEng":"jujjjujj::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 86,
    admin: 4,
    dateTime: "2021-11-12T06:24:10.248+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 87,
    admin: 4,
    dateTime: "2021-11-12T06:24:26.497+00:00",
    action:
      '{"Создано ":{"textKz":"dfjglfjdfjglfj::48","textRu":"dfjglfj::48","textEng":"dfjglfjdfjglfjdfjglfj::48"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 88,
    admin: 4,
    dateTime: "2021-11-12T06:30:03.591+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: dfjglfjdfjglfj","textRu":"Даулет Даулет, назначен(а) на новую должность: dfjglfj","textEng":"Даулет Даулет, appointed to a new position: dfjglfjdfjglfjdfjglfj"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 89,
    admin: 4,
    dateTime: "2021-11-12T09:57:29.783+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: mnf.mva","textRu":"Михаил Щупаков, назначен(а) на новую должность: f.mva","textEng":"Михаил Щупаков, appointed to a new position: f.mvaf.mva"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 90,
    admin: 4,
    dateTime: "2021-11-12T10:03:18.332+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: null","textRu":"Михаил Щупаков, назначен(а) на новую должность: null","textEng":"Михаил Щупаков, appointed to a new position: null"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 91,
    admin: 4,
    dateTime: "2021-11-12T10:12:48.721+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: ksdljfkldksdljfkld","textRu":"Михаил Щупаков, назначен(а) на новую должность: ksdljfkld","textEng":"Михаил Щупаков, appointed to a new position: ksdljfkldksdljfkldksdljfkld"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 92,
    admin: 4,
    dateTime: "2021-11-12T10:27:16.963+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: Test1Test1","textRu":"Михаил Щупаков, назначен(а) на новую должность: Test1","textEng":"Михаил Щупаков, appointed to a new position: Test1Test1Test1"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 93,
    admin: 4,
    dateTime: "2021-11-12T10:41:19.597+00:00",
    action:
      '{"Создано ":{"textKz":"fkdnglnkfkdnglnk::38","textRu":"fkdnglnk::38","textEng":"fkdnglnkfkdnglnkfkdnglnk::38"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 94,
    admin: 4,
    dateTime: "2021-11-12T10:41:32.801+00:00",
    action:
      '{"Создано ":{"textKz":"jkdfjkdf::38","textRu":"jkdf::38","textEng":"jkdfjkdfjkdf::38"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 95,
    admin: 4,
    dateTime: "2021-11-12T10:41:53.262+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: jkdfjkdf","textRu":"Даулет Даулет, назначен(а) на новую должность: jkdf","textEng":"Даулет Даулет, appointed to a new position: jkdfjkdfjkdf"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 96,
    admin: 4,
    dateTime: "2021-11-12T10:45:15.512+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: qwwqww","textRu":"Михаил Щупаков, назначен(а) на новую должность: qww","textEng":"Михаил Щупаков, appointed to a new position: qwwqwwqww"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 97,
    admin: 4,
    dateTime: "2021-11-12T10:48:35.019+00:00",
    action:
      '{"Создано ":{"textKz":"sdhgfhdgsjsdhgfhdgsj","textRu":"sdhgfhdgsj","textEng":"sdhgfhdgsjsdhgfhdgsjsdhgfhdgsj"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 98,
    admin: 4,
    dateTime: "2021-11-12T10:50:30.868+00:00",
    action:
      '{"Создано ":{"textKz":"dkvlndkvln::51","textRu":"dkvln::51","textEng":"dkvlndkvlndf::51"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 99,
    admin: 4,
    dateTime: "2021-11-12T10:51:02.835+00:00",
    action:
      '{"Создано ":{"textKz":"jfdbjfdb::51","textRu":"jfdb::51","textEng":"jfdbjfdbjfdb::51"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 100,
    admin: 4,
    dateTime: "2021-11-12T10:51:17.564+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: jfdbjfdb","textRu":"Михаил Щупаков, назначен(а) на новую должность: jfdb","textEng":"Михаил Щупаков, appointed to a new position: jfdbjfdbjfdb"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 101,
    admin: 4,
    dateTime: "2021-11-12T10:56:49.024+00:00",
    action:
      '{"Создано ":{"textKz":"jdfbvkjbfkjjdfbvkjbfkj","textRu":"jdfbvkjbfkj","textEng":"jdfbvkjbfkjkjk"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 102,
    admin: 4,
    dateTime: "2021-11-12T10:57:15.848+00:00",
    action:
      '{"Создано ":{"textKz":"ndsbvkjndsbvkj::52","textRu":"ndsbvkj::52","textEng":"ndsbvkjndsbvkjndsbvkj::52"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 103,
    admin: 4,
    dateTime: "2021-11-12T10:57:27.791+00:00",
    action:
      '{"Создано ":{"textKz":"bdsbds::52","textRu":"bds::52","textEng":"bdsbdsbds::52"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 104,
    admin: 4,
    dateTime: "2021-11-12T10:57:49.521+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: bdsbds","textRu":"Михаил Щупаков, назначен(а) на новую должность: bds","textEng":"Михаил Щупаков, appointed to a new position: bdsbdsbds"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 105,
    admin: 4,
    dateTime: "2021-11-12T11:05:19.754+00:00",
    action:
      '{"Создано ":{"textKz":"dfbghlvf","textRu":"dfbghl","textEng":"dfbghljfdnbvkj"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 106,
    admin: 4,
    dateTime: "2021-11-12T11:05:38.366+00:00",
    action:
      '{"Создано ":{"textKz":"qwrtqqwrtq::53","textRu":"qwrtq::53","textEng":"qwrtqqwrtqqwrtq::53"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 107,
    admin: 4,
    dateTime: "2021-11-12T11:05:50.310+00:00",
    action:
      '{"Создано ":{"textKz":"djfnbkdjfnbk::53","textRu":"djfnbk::53","textEng":"djfnbkdjfnbkdjfnbk::53"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 108,
    admin: 4,
    dateTime: "2021-11-12T11:06:23.504+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: djfnbkdjfnbk","textRu":"Даулет Даулет, назначен(а) на новую должность: djfnbk","textEng":"Даулет Даулет, appointed to a new position: djfnbkdjfnbkdjfnbk"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 109,
    admin: 4,
    dateTime: "2021-11-12T11:32:47.593+00:00",
    action:
      '{"Создано ":{"textKz":"jbnfgjbjbnfgjb","textRu":"jbnfgjb","textEng":"jbnfgjbjnkj"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 110,
    admin: 4,
    dateTime: "2021-11-12T11:33:11.998+00:00",
    action:
      '{"Создано ":{"textKz":"nfgnnfgn::54","textRu":"nfgn::54","textEng":"nfgnnfgnnfgn::54"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 111,
    admin: 4,
    dateTime: "2021-11-12T11:33:25.220+00:00",
    action:
      '{"Создано ":{"textKz":"jfnvjjfnvj::54","textRu":"jfnvj::54","textEng":"jfnvjjfnvjjfnvjjfnvj::54"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 112,
    admin: 4,
    dateTime: "2021-11-12T11:33:46.827+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: jfnvjjfnvj","textRu":"Даулет Даулет, назначен(а) на новую должность: jfnvj","textEng":"Даулет Даулет, appointed to a new position: jfnvjjfnvjjfnvjjfnvj"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 113,
    admin: 4,
    dateTime: "2021-11-12T12:06:48.210+00:00",
    action:
      '{"Создано ":{"textKz":"bjkbj","textRu":"fdgfdf","textEng":"jlij"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 114,
    admin: 4,
    dateTime: "2021-11-12T12:08:39.915+00:00",
    action:
      '{"Создано ":{"textKz":"dbvjkdbvjk::55","textRu":"dbvjk::55","textEng":"dbvjkdbvjkdbvjk::55"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 115,
    admin: 4,
    dateTime: "2021-11-12T12:12:34.321+00:00",
    action:
      '{"Создано ":{"textKz":"mndmvmndmv::55","textRu":"mndmv::55","textEng":"mndmvmndmvmndmv::55"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 116,
    admin: 4,
    dateTime: "2021-11-12T12:26:13.586+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: mndmvmndmv","textRu":"Михаил Щупаков, назначен(а) на новую должность: mndmv","textEng":"Михаил Щупаков, appointed to a new position: mndmvmndmvmndmv"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 117,
    admin: 4,
    dateTime: "2021-11-15T06:09:33.039+00:00",
    action:
      '{"Создано ":{"textKz":"Министерство экологии, геологии и природных ресурсов","textRu":"Министерство экологии, геологии и природных ресурсов","textEng":"Ministry of ecology"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 118,
    admin: 4,
    dateTime: "2021-11-15T06:10:05.924+00:00",
    action:
      '{"Создано ":{"textKz":"Басшылар::56","textRu":"Руководство::56","textEng":"Chiefs::56"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 119,
    admin: 4,
    dateTime: "2021-11-15T06:14:23.897+00:00",
    action:
      '{"Создано ":{"textKz":"asdfasd::56","textRu":"asdf::56","textEng":"f::56"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 120,
    admin: 4,
    dateTime: "2021-11-15T06:14:27.885+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 121,
    admin: 4,
    dateTime: "2021-11-15T06:14:56.548+00:00",
    action:
      '{"Создано ":{"textKz":"Председатель::56","textRu":"Председатель::56","textEng":"Vice ::56"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 122,
    admin: 4,
    dateTime: "2021-11-15T06:16:34.473+00:00",
    action:
      '{"Создано ":{"textKz":"Заместитель председателя::56","textRu":"Заместитель председателя::56","textEng":"Zamestitel\' predsedatelya::56"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 123,
    admin: 4,
    dateTime: "2021-11-15T06:29:10.482+00:00",
    action:
      '{"Создано ":{"textKz":"Управление внутреннего администрирования и по работе с поведомтсвенными организация::56","textRu":"Управление внутреннего администрирования и по работе с поведомтсвенными организациями::56","textEng":"Manage::56"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 124,
    admin: 4,
    dateTime: "2021-11-15T06:31:27.915+00:00",
    action:
      '{"Создано ":{"textKz":"Басшы эксперт::56","textRu":"Главный эксперт по режиму::56","textEng":"Main expert::56"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 125,
    admin: 4,
    dateTime: "2021-11-15T06:31:53.317+00:00",
    action:
      '{"Создано ":{"textKz":"Басшы эксперт::56","textRu":"Главный эксперт по режиму::56","textEng":"Main expert::56"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 126,
    admin: 4,
    dateTime: "2021-11-15T06:32:43.527+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: Председатель","textRu":"Михаил Щупаков, назначен(а) на новую должность: Председатель","textEng":"Михаил Щупаков, appointed to a new position: Vice "}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 127,
    admin: 4,
    dateTime: "2021-11-15T06:32:49.604+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: Заместитель председателя","textRu":"Даулет Даулет, назначен(а) на новую должность: Заместитель председателя","textEng":"Даулет Даулет, appointed to a new position: Zamestitel\' predsedatelya"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 128,
    admin: 4,
    dateTime: "2021-11-15T06:32:59.734+00:00",
    action:
      '{"Создано ":{"textKz":"Сергей Дроздов, жаңа лауазымға тағайындалды: Басшы эксперт","textRu":"Сергей Дроздов, назначен(а) на новую должность: Главный эксперт по режиму","textEng":"Сергей Дроздов, appointed to a new position: Main expert"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 129,
    admin: 4,
    dateTime: "2021-11-15T06:49:15.433+00:00",
    action:
      '{"Создано ":{"textKz":"ффф::18","textRu":"ффф::18","textEng":"фффф::18"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 130,
    admin: 4,
    dateTime: "2021-11-15T06:49:27.770+00:00",
    action:
      '{"Создано ":{"textKz":"ааа::18","textRu":"ааа::18","textEng":"аааа::18"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 131,
    admin: 40,
    dateTime: "2021-11-16T10:02:10.005+00:00",
    action:
      '{"Создано ":{"textKz":"null null, жаңа лауазымға тағайындалды: opopopop","textRu":"null null, назначен(а) на новую должность: opop","textEng":"null null, appointed to a new position: opopopopopop"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 132,
    admin: 40,
    dateTime: "2021-11-16T10:04:22.097+00:00",
    action:
      '{"Создано ":{"textKz":"null null, жаңа лауазымға тағайындалды: opopopop","textRu":"null null, назначен(а) на новую должность: opop","textEng":"null null, appointed to a new position: opopopopopop"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 133,
    admin: 40,
    dateTime: "2021-11-16T10:05:40.198+00:00",
    action:
      '{"Создано ":{"textKz":"null null, жаңа лауазымға тағайындалды: opopopop","textRu":"null null, назначен(а) на новую должность: opop","textEng":"null null, appointed to a new position: opopopopopop"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 134,
    admin: 40,
    dateTime: "2021-11-16T10:08:25.410+00:00",
    action:
      '{"Создано ":{"textKz":"null null, жаңа лауазымға тағайындалды: opopopop","textRu":"null null, назначен(а) на новую должность: opop","textEng":"null null, appointed to a new position: opopopopopop"}}',
    adminObject: {
      id: 40,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA40",
    },
  },
  {
    id: 135,
    admin: 4,
    dateTime: "2021-11-16T10:08:42.883+00:00",
    action:
      '{"Создано ":{"textKz":"PowPow","textRu":"Pow","textEng":"PowPowPow"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 136,
    admin: 4,
    dateTime: "2021-11-16T10:09:05.092+00:00",
    action:
      '{"Создано ":{"textKz":"LolLol::57","textRu":"Lol::57","textEng":"LolLolLol::57"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 137,
    admin: 4,
    dateTime: "2021-11-16T10:09:18.367+00:00",
    action:
      '{"Создано ":{"textKz":"PopPop::57","textRu":"Pop::57","textEng":"PopPopPop::57"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 138,
    admin: 4,
    dateTime: "2021-11-16T10:09:30.466+00:00",
    action:
      '{"Создано ":{"textKz":"PositionPosition::57","textRu":"Position::57","textEng":"PositionPositionPosition::57"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 139,
    admin: 4,
    dateTime: "2021-11-16T10:10:47.379+00:00",
    action:
      '{"Создано ":{"textKz":"SubSub::57","textRu":"Sub::57","textEng":"SubSubSub::57"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 140,
    admin: 4,
    dateTime: "2021-11-16T10:11:30.375+00:00",
    action:
      '{"Создано ":{"textKz":"subsub::57","textRu":"sub::57","textEng":"subsubsub::57"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 141,
    admin: 4,
    dateTime: "2021-11-16T10:11:45.091+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: PositionPosition","textRu":"Даулет Даулет, назначен(а) на новую должность: Position","textEng":"Даулет Даулет, appointed to a new position: PositionPositionPosition"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 142,
    admin: 4,
    dateTime: "2021-11-16T10:12:12.673+00:00",
    action:
      '{"Создано ":{"textKz":"Lol1Lol1::57","textRu":"Lol1::57","textEng":"Lol1Lol1Lol1::57"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 143,
    admin: 4,
    dateTime: "2021-11-16T10:18:02.494+00:00",
    action: '{"Создано ":{"textKz":"nnn","textRu":"Тест","textEng":"kjgh"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 144,
    admin: 4,
    dateTime: "2021-11-16T10:42:09.554+00:00",
    action:
      '{"Создано ":{"textKz":"Тест ГОказ","textRu":"Тест ГО","textEng":"Test GO"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 145,
    admin: 4,
    dateTime: "2021-11-16T10:43:28.336+00:00",
    action:
      '{"Создано ":{"textKz":"Бастык::59","textRu":"Руководство::59","textEng":"Boss::59"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 146,
    admin: 4,
    dateTime: "2021-11-16T10:43:50.975+00:00",
    action:
      '{"Создано ":{"textKz":"ЗаместительКАЗ::59","textRu":"Заместитель::59","textEng":"Vice::59"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 147,
    admin: 4,
    dateTime: "2021-11-16T10:44:08.021+00:00",
    action:
      '{"Создано ":{"textKz":"ДиректорКаз::59","textRu":"Директор::59","textEng":"Chief::59"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 148,
    admin: 4,
    dateTime: "2021-11-16T10:44:56.295+00:00",
    action:
      '{"Создано ":{"textKz":"Администратор Картыпортала, жаңа лауазымға тағайындалды: ДиректорКаз","textRu":"Администратор Картыпортала, назначен(а) на новую должность: Директор","textEng":"Администратор Картыпортала, appointed to a new position: Chief"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 149,
    admin: 4,
    dateTime: "2021-11-16T10:45:02.567+00:00",
    action:
      '{"Создано ":{"textKz":"Ленура Замалдинова, жаңа лауазымға тағайындалды: ЗаместительКАЗ","textRu":"Ленура Замалдинова, назначен(а) на новую должность: Заместитель","textEng":"Ленура Замалдинова, appointed to a new position: Vice"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 150,
    admin: 4,
    dateTime: "2021-11-16T10:54:19.308+00:00",
    action:
      '{"Создано ":{"textKz":"HelloHello","textRu":"Hello","textEng":"HelloHelloHello"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 151,
    admin: 4,
    dateTime: "2021-11-16T10:55:26.571+00:00",
    action:
      '{"Создано ":{"textKz":"JklJkl::60","textRu":"Jkl::60","textEng":"JklJklJkl::60"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 152,
    admin: 4,
    dateTime: "2021-11-16T10:55:35.652+00:00",
    action:
      '{"Создано ":{"textKz":"poppop::60","textRu":"pop::60","textEng":"poppoppop::60"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 153,
    admin: 4,
    dateTime: "2021-11-16T10:55:48.678+00:00",
    action:
      '{"Создано ":{"textKz":"poppop::60","textRu":"pop::60","textEng":"poppoppop::60"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 154,
    admin: 4,
    dateTime: "2021-11-16T10:56:07.816+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: poppop","textRu":"Михаил Щупаков, назначен(а) на новую должность: pop","textEng":"Михаил Щупаков, appointed to a new position: poppoppop"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 155,
    admin: 4,
    dateTime: "2021-11-16T11:09:32.250+00:00",
    action:
      '{"Создано ":{"textKz":"lfjdgvjflfjdgvjf","textRu":"lfjdgvjf","textEng":"lfjdgvjflfjdgvjflfjdgvjf"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 156,
    admin: 4,
    dateTime: "2021-11-16T11:17:20.641+00:00",
    action:
      '{"Создано ":{"textKz":"bjgbjk::61","textRu":"012345678901::61","textEng":"bjgbjkbjgbjk::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 157,
    admin: 4,
    dateTime: "2021-11-16T11:17:31.203+00:00",
    action:
      '{"Создано ":{"textKz":"mgnbgmgnbgmgnbg::61","textRu":"mgnbg::61","textEng":"mgnbgmgnbg::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 158,
    admin: 4,
    dateTime: "2021-11-16T11:17:42.229+00:00",
    action:
      '{"Создано ":{"textKz":"gmnbgmnb::61","textRu":"gmnb::61","textEng":"gmnbgmnbgmnb::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 159,
    admin: 4,
    dateTime: "2021-11-16T11:17:50.027+00:00",
    action:
      '{"Создано ":{"textKz":"gmnbgmnb::61","textRu":"gmnb::61","textEng":"gmnbgmnbgmnb::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 160,
    admin: 4,
    dateTime: "2021-11-16T11:18:15.006+00:00",
    action:
      '{"Создано ":{"textKz":"fmnb,mfmnb,m::61","textRu":"fmnb,m::61","textEng":"fmnb,mfmnb,mfmnb,m::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 161,
    admin: 4,
    dateTime: "2021-11-16T11:24:31.623+00:00",
    action:
      '{"Создано ":{"textKz":"jfjfdhvkjfdhvjjfdhvkjfdhvj::61","textRu":"jfdhvkjfdhvj::61","textEng":"jfjfjfdhvkjfdhvjjfdhvkjfdhvjjfdhvkjfdhvj::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 162,
    admin: 4,
    dateTime: "2021-11-16T11:24:48.581+00:00",
    action:
      '{"Создано ":{"textKz":"mfbvnmfbvn::61","textRu":"mfbvn::61","textEng":"mfbvnmfbvnmfbvn::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 163,
    admin: 4,
    dateTime: "2021-11-16T11:25:03.886+00:00",
    action:
      '{"Создано ":{"textKz":"mfnbmfnb::61","textRu":"mfnb::61","textEng":"mfnbmfnbmfnbmfnb::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 164,
    admin: 4,
    dateTime: "2021-11-16T11:25:15.489+00:00",
    action:
      '{"Создано ":{"textKz":"kflnvklkflnvkl::61","textRu":"kflnvkl::61","textEng":"kflnvklkflnvklkflnvkl::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 165,
    admin: 4,
    dateTime: "2021-11-16T11:28:24.675+00:00",
    action:
      '{"Создано ":{"textKz":"fdjhgkdffdjhgkdf::61","textRu":"fdjhgkdf::61","textEng":"fdjhgkdffdjhgkdffdjhgkdf::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 166,
    admin: 4,
    dateTime: "2021-11-16T11:28:32.325+00:00",
    action:
      '{"Создано ":{"textKz":"kokokokokoko::61","textRu":"kokoko::61","textEng":"kokokokokokokokoko::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 167,
    admin: 4,
    dateTime: "2021-11-16T11:28:43.205+00:00",
    action:
      '{"Создано ":{"textKz":"kokoko::61","textRu":"kokokokokokokokoko::61","textEng":"kokokokokokokokokov::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 168,
    admin: 4,
    dateTime: "2021-11-16T11:28:58.316+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 169,
    admin: 4,
    dateTime: "2021-11-16T11:29:15.176+00:00",
    action:
      '{"Создано ":{"textKz":"kdnfbldnfblkdnfbldnfbl::61","textRu":"kdnfbldnfbl::61","textEng":"kdnfbldnfblkdnfbldnfblkdnfbldnfbl::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 170,
    admin: 4,
    dateTime: "2021-11-16T11:32:42.895+00:00",
    action:
      '{"Создано ":{"textKz":"qwtrtqeyruqwtrtqeyru::61","textRu":"qwtrtqeyru::61","textEng":"qwtrtqeyruqwtrtqeyruqwtrtqeyruqwtrtqeyru::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 171,
    admin: 4,
    dateTime: "2021-11-16T11:32:52.949+00:00",
    action:
      '{"Создано ":{"textKz":"jfhbkjjfhbkj::61","textRu":"jfhbkj::61","textEng":"jfhbkjjfhbkjjfhbkj::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 172,
    admin: 4,
    dateTime: "2021-11-16T11:33:06.323+00:00",
    action:
      '{"Создано ":{"textKz":"kfnbkgkfnbkg::61","textRu":"kfnbkg::61","textEng":"kfnbkgkfnbkgkfnbkg::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 173,
    admin: 4,
    dateTime: "2021-11-16T11:33:15.987+00:00",
    action:
      '{"Создано ":{"textKz":"fjnbkjgkjfjnbkjgkj::61","textRu":"fjnbkjgkj::61","textEng":"fjnbkjgkjfjnbkjgkjfjnbkjgkj::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 174,
    admin: 4,
    dateTime: "2021-11-16T11:37:08.736+00:00",
    action:
      '{"Создано ":{"textKz":"popoppopopopoppopo::61","textRu":"popoppopo::61","textEng":"popoppopopopoppopopopoppopo::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 175,
    admin: 4,
    dateTime: "2021-11-16T11:37:20.473+00:00",
    action:
      '{"Создано ":{"textKz":"fnbjngjkfnbjngjk::61","textRu":"fnbjngjk::61","textEng":"fnbjngjkfnbjngjkfnbjngjk::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 176,
    admin: 4,
    dateTime: "2021-11-16T11:37:29.611+00:00",
    action:
      '{"Создано ":{"textKz":"plpoppplpopp::61","textRu":"plpopp::61","textEng":"plpoppplpoppplpopp::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 177,
    admin: 4,
    dateTime: "2021-11-16T11:37:42.121+00:00",
    action:
      '{"Создано ":{"textKz":"zxcvbnf::61","textRu":"zxcvbn::61","textEng":"zxcvbnhh::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 178,
    admin: 4,
    dateTime: "2021-11-16T11:41:02.265+00:00",
    action:
      '{"Создано ":{"textKz":"mnbmnb::61","textRu":"mnb::61","textEng":"mnbmnbmnb::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 179,
    admin: 4,
    dateTime: "2021-11-16T11:41:11.621+00:00",
    action:
      '{"Создано ":{"textKz":"hfgjhhfgjh::61","textRu":"hfgjh::61","textEng":"hfgjhhfgjhhfgjh::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 180,
    admin: 4,
    dateTime: "2021-11-16T11:41:19.860+00:00",
    action:
      '{"Создано ":{"textKz":"fdjkhkfdjkhk::61","textRu":"fdjkhk::61","textEng":"fdjkhkfdjkhkfdjkhk::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 181,
    admin: 4,
    dateTime: "2021-11-16T11:41:30.131+00:00",
    action:
      '{"Создано ":{"textKz":"nbvcxZxcvbnbvcxZxcvb::61","textRu":"nbvcxZxcvb::61","textEng":"nbvcxZxcvbnbvcxZxcvbnbvcxZxcvb::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 182,
    admin: 4,
    dateTime: "2021-11-16T11:41:50.097+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 183,
    admin: 4,
    dateTime: "2021-11-16T11:43:46.725+00:00",
    action:
      '{"Создано ":{"textKz":"kfgnblkgkfgnblkg::61","textRu":"kfgnblkg::61","textEng":"kfgnblkgkfgnblkgkfgnblkg::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 184,
    admin: 4,
    dateTime: "2021-11-16T11:44:06.054+00:00",
    action:
      '{"Создано ":{"textKz":"lkjiouoilkjiouoi::61","textRu":"lkjiouoi::61","textEng":"lkjiouoilkjiouoilkjiouoi::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 185,
    admin: 4,
    dateTime: "2021-11-16T11:44:19.291+00:00",
    action:
      '{"Создано ":{"textKz":"kldfhjkhjkkldfhjkhjk::61","textRu":"kldfhjkhjk::61","textEng":"kldfhjkhjkkldfhjkhjkkldfhjkhjk::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 186,
    admin: 4,
    dateTime: "2021-11-16T11:44:29.824+00:00",
    action:
      '{"Создано ":{"textKz":"oiuytv::61","textRu":"oiuyt::61","textEng":"oiuytoiuyt::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 187,
    admin: 4,
    dateTime: "2021-11-16T11:48:47.561+00:00",
    action:
      '{"Создано ":{"textKz":"fnbjgfjfnbjgfj::61","textRu":"fnbjgfj::61","textEng":"fnbjgfjfnbjgfjfnbjgfj::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 188,
    admin: 4,
    dateTime: "2021-11-16T11:48:56.897+00:00",
    action:
      '{"Создано ":{"textKz":"ityuoityuo::61","textRu":"ityuo::61","textEng":"ityuoityuoityuo::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 189,
    admin: 4,
    dateTime: "2021-11-16T11:49:09.686+00:00",
    action:
      '{"Создано ":{"textKz":"rthgubjkrthgubjkrthgubjk::61","textRu":"rthgubjk::61","textEng":"rthgubjkrthgubjk::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 190,
    admin: 4,
    dateTime: "2021-11-16T11:49:21.446+00:00",
    action:
      '{"Создано ":{"textKz":"ghfjkdlsghfjkdls::61","textRu":"ghfjkdls::61","textEng":"ghfjkdlsghfjkdlsghfjkdls::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 191,
    admin: 4,
    dateTime: "2021-11-16T11:51:08.681+00:00",
    action:
      '{"Создано ":{"textKz":"kfbngfnlkkfbngfnlk::61","textRu":"kfbngfnlk::61","textEng":"kfbngfnlkkfbngfnlkkfbngfnlkkfbngfnlk::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 192,
    admin: 4,
    dateTime: "2021-11-16T11:51:19.021+00:00",
    action:
      '{"Создано ":{"textKz":"fkln;lhknfkln;lhknvv::61","textRu":"fkln;lhkn::61","textEng":"fkln;lhknfkln;lhkn::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 193,
    admin: 4,
    dateTime: "2021-11-16T11:51:28.258+00:00",
    action:
      '{"Создано ":{"textKz":"pppppppppppppppppppppppppppppppppppp::61","textRu":"pppppppppppp::61","textEng":"pppppppppppppppppppppppp::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 194,
    admin: 4,
    dateTime: "2021-11-16T11:51:50.880+00:00",
    action:
      '{"Создано ":{"textKz":"sldv;l,sldv;l,::61","textRu":"sldv;l,::61","textEng":"sldv;l,sldv;l,sldv;l,::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 195,
    admin: 4,
    dateTime: "2021-11-16T11:55:02.645+00:00",
    action:
      '{"Создано ":{"textKz":"hgjkhhgjkh::61","textRu":"hgjkh::61","textEng":"hgjkhhgjkhhgjkh::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 196,
    admin: 4,
    dateTime: "2021-11-16T11:55:15.712+00:00",
    action:
      '{"Создано ":{"textKz":"hgjkhhgjkhvdfhgjkhhgjkhvdf::61","textRu":"hgjkhhgjkhvdf::61","textEng":"hgjkhhgjkhvdfhgjkhhgjkhvdfdd::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 197,
    admin: 4,
    dateTime: "2021-11-16T11:55:29.445+00:00",
    action:
      '{"Создано ":{"textKz":"fgnblkgffgnblkgf::61","textRu":"fgnblkgf::61","textEng":"fgnblkgffgnblkgffgnblkgf::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 198,
    admin: 4,
    dateTime: "2021-11-16T11:55:36.058+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 199,
    admin: 4,
    dateTime: "2021-11-16T11:55:38.260+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 200,
    admin: 4,
    dateTime: "2021-11-16T11:55:40.159+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 201,
    admin: 4,
    dateTime: "2021-11-16T11:55:42.414+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 202,
    admin: 4,
    dateTime: "2021-11-16T11:55:45.856+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 203,
    admin: 4,
    dateTime: "2021-11-16T11:55:48.974+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 204,
    admin: 4,
    dateTime: "2021-11-16T11:55:49.773+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 205,
    admin: 4,
    dateTime: "2021-11-16T11:55:55.022+00:00",
    action:
      '{"titleKz":"Позиция","textKz":"Өзгерістер: күй","textRu":"Изменения: статус","textEng":"Changes: status","titleRu":"Должность","titleEng":"Position"}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 206,
    admin: 4,
    dateTime: "2021-11-16T11:56:00.445+00:00",
    action:
      '{"Создано ":{"textKz":"hgfkhgfk::61","textRu":"hgfk::61","textEng":"hgfkhgfkhgfk::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 207,
    admin: 4,
    dateTime: "2021-11-16T11:56:58.639+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: hgfkhgfk","textRu":"Михаил Щупаков, назначен(а) на новую должность: hgfk","textEng":"Михаил Щупаков, appointed to a new position: hgfkhgfkhgfk"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 208,
    admin: 4,
    dateTime: "2021-11-16T11:58:56.832+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: hgfkhgfk","textRu":"Даулет Даулет, назначен(а) на новую должность: hgfk","textEng":"Даулет Даулет, appointed to a new position: hgfkhgfkhgfk"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 209,
    admin: 4,
    dateTime: "2021-11-16T13:33:24.487+00:00",
    action:
      '{"Создано ":{"textKz":"Уақытша кетеді: Михаил Щупаков, орнына: null null","textRu":"Временно уходит: Михаил Щупаков, заменяет: null null","textEng":"Temporarily leaves: Михаил Щупаков, replaces: null null"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 210,
    admin: 4,
    dateTime: "2021-11-16T13:34:54.940+00:00",
    action:
      '{"Создано ":{"textKz":"Уақытша кетеді: Михаил Щупаков, орнына: null null","textRu":"Временно уходит: Михаил Щупаков, заменяет: null null","textEng":"Temporarily leaves: Михаил Щупаков, replaces: null null"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 211,
    admin: 4,
    dateTime: "2021-11-16T13:43:02.467+00:00",
    action:
      '{"Создано ":{"textKz":"Уақытша кетеді: Михаил Щупаков, орнына: null null","textRu":"Временно уходит: Михаил Щупаков, заменяет: null null","textEng":"Temporarily leaves: Михаил Щупаков, replaces: null null"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 212,
    admin: 4,
    dateTime: "2021-11-17T09:17:50.307+00:00",
    action:
      '{"Создано ":{"textKz":"Уақытша кетеді: Михаил Щупаков, орнына: null null","textRu":"Временно уходит: Михаил Щупаков, заменяет: null null","textEng":"Temporarily leaves: Михаил Щупаков, replaces: null null"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 213,
    admin: 4,
    dateTime: "2021-11-17T09:47:13.116+00:00",
    action:
      '{"Создано ":{"textKz":"nfgbnbdfgdbgnfgbnbdfgdbg::61","textRu":"nfgbnbdfgdbg::61","textEng":"nfgbnbdfgdbgnfgbnbdfgdbgnfgbnbdfgdbg::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 214,
    admin: 4,
    dateTime: "2021-11-17T09:47:20.536+00:00",
    action:
      '{"Создано ":{"textKz":"fgnklglkfgnklglk::61","textRu":"fgnklglk::61","textEng":"fgnklglkfgnklglkfgnklglk::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 215,
    admin: 4,
    dateTime: "2021-11-17T09:47:33.605+00:00",
    action:
      '{"Создано ":{"textKz":"mfdklbnfgklmfdklbnfgkl::61","textRu":"mfdklbnfgkl::61","textEng":"mfdklbnfgklmfdklbnfgklmfdklbnfgkl::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 216,
    admin: 4,
    dateTime: "2021-11-17T09:49:05.922+00:00",
    action:
      '{"Создано ":{"textKz":"fcgvbhnjmfcgvbhnjm::61","textRu":"fcgvbhnjm::61","textEng":"fcgvbhnjmfcgvbhnjmfcgvbhnjm::61"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 217,
    admin: 4,
    dateTime: "2021-11-17T09:49:29.289+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: mfdklbnfgklmfdklbnfgkl","textRu":"Михаил Щупаков, назначен(а) на новую должность: mfdklbnfgkl","textEng":"Михаил Щупаков, appointed to a new position: mfdklbnfgklmfdklbnfgklmfdklbnfgkl"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 218,
    admin: 4,
    dateTime: "2021-11-17T10:21:59.029+00:00",
    action:
      '{"Создано ":{"textKz":"Уақытша кетеді: Михаил Щупаков, орнына: null null","textRu":"Временно уходит: Михаил Щупаков, заменяет: null null","textEng":"Temporarily leaves: Михаил Щупаков, replaces: null null"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 219,
    admin: 4,
    dateTime: "2021-11-17T10:30:06.363+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: mfdklbnfgklmfdklbnfgkl","textRu":"Даулет Даулет, назначен(а) на новую должность: mfdklbnfgkl","textEng":"Даулет Даулет, appointed to a new position: mfdklbnfgklmfdklbnfgklmfdklbnfgkl"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 220,
    admin: 4,
    dateTime: "2021-11-17T10:30:54.391+00:00",
    action:
      '{"Создано ":{"textKz":"Уақытша кетеді: Михаил Щупаков, орнына: null null","textRu":"Временно уходит: Михаил Щупаков, заменяет: null null","textEng":"Temporarily leaves: Михаил Щупаков, replaces: null null"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 221,
    admin: 4,
    dateTime: "2021-11-17T10:36:59.857+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: mfdklbnfgklmfdklbnfgkl","textRu":"Даулет Даулет, назначен(а) на новую должность: mfdklbnfgkl","textEng":"Даулет Даулет, appointed to a new position: mfdklbnfgklmfdklbnfgklmfdklbnfgkl"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 222,
    admin: 4,
    dateTime: "2021-11-17T10:37:22.021+00:00",
    action:
      '{"Создано ":{"textKz":"Уақытша кетеді: Даулет Даулет, орнына: null null","textRu":"Временно уходит: Даулет Даулет, заменяет: null null","textEng":"Temporarily leaves: Даулет Даулет, replaces: null null"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 223,
    admin: 4,
    dateTime: "2021-11-17T10:40:41.877+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: mfdklbnfgklmfdklbnfgkl","textRu":"Даулет Даулет, назначен(а) на новую должность: mfdklbnfgkl","textEng":"Даулет Даулет, appointed to a new position: mfdklbnfgklmfdklbnfgklmfdklbnfgkl"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 224,
    admin: 4,
    dateTime: "2021-11-17T10:41:17.912+00:00",
    action:
      '{"Создано ":{"textKz":"Уақытша кетеді: Даулет Даулет, орнына: null null","textRu":"Временно уходит: Даулет Даулет, заменяет: null null","textEng":"Temporarily leaves: Даулет Даулет, replaces: null null"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 225,
    admin: 4,
    dateTime: "2021-11-17T10:44:00.367+00:00",
    action:
      '{"Создано ":{"textKz":"Михаил Щупаков, жаңа лауазымға тағайындалды: mfdklbnfgklmfdklbnfgkl","textRu":"Михаил Щупаков, назначен(а) на новую должность: mfdklbnfgkl","textEng":"Михаил Щупаков, appointed to a new position: mfdklbnfgklmfdklbnfgklmfdklbnfgkl"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 226,
    admin: 4,
    dateTime: "2021-11-17T10:49:04.377+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: mfdklbnfgklmfdklbnfgkl","textRu":"Даулет Даулет, назначен(а) на новую должность: mfdklbnfgkl","textEng":"Даулет Даулет, appointed to a new position: mfdklbnfgklmfdklbnfgklmfdklbnfgkl"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 227,
    admin: 4,
    dateTime: "2021-11-17T10:49:11.255+00:00",
    action:
      '{"Создано ":{"textKz":"null null, жаңа лауазымға тағайындалды: mfdklbnfgklmfdklbnfgkl","textRu":"null null, назначен(а) на новую должность: mfdklbnfgkl","textEng":"null null, appointed to a new position: mfdklbnfgklmfdklbnfgklmfdklbnfgkl"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
  {
    id: 228,
    admin: 4,
    dateTime: "2021-11-17T10:49:17.252+00:00",
    action:
      '{"Создано ":{"textKz":"Даулет Даулет, жаңа лауазымға тағайындалды: mfdklbnfgklmfdklbnfgkl","textRu":"Даулет Даулет, назначен(а) на новую должность: mfdklbnfgkl","textEng":"Даулет Даулет, appointed to a new position: mfdklbnfgklmfdklbnfgklmfdklbnfgkl"}}',
    adminObject: {
      id: 4,
      firstname: null,
      lastname: null,
      username: "null null",
      camundaId: "CAMUNDA4",
    },
  },
];

interface ILogsAndVersionsStore {
  logs: ILog[] | null;
  versions: IVersion[] | null;
  versionTree: ITree | null;
}

export const logsStore: Module<ILogsAndVersionsStore, any> = {
  state: {
    logs: null,
    versions: null,
    versionTree: null,
  },
  mutations: {
    [SET_LOGS](state, logs: ILogGet[]) {
      state.logs = logs.map((logGet) => {
        let action;
        try {
          action = JSON.parse(logGet.action);
        } catch (e) {
          action = null;
        }
        const log: ILog = {
          ...logGet,
          comment: action
            ? Vue.filter("translate")(action[Object.keys(action)[0]])
            : "----",
          action: action ? Object.keys(action)[0] : "-----",
        };
        log.dateTime = moment(log.dateTime).format("DD/MM/YYYY hh:mm");
        return log;
      });
    },
    [SET_VERSIONS](state, versions: IVersion[]) {
      state.versions = versions.map((version) => {
        version.userObject = {
          id: 243,
          firstname: "TestName",
          lastname: "TestSurname",
          username: "TestSurname TestName",
        };
        return version;
      });
    },
    [SET_VERSION_TREE](state, versionTree: ITree) {
      state.versionTree = versionTree;
    },
  },
  actions: {
    async [SET_LOGS](ctx) {
      ctx.commit(SET_LOGS, dump);
      return;
      await logsService.getLogs().then((logs: ILogGet[]) => {
        ctx.commit(SET_LOGS, logs);
      });
    },
    async [SET_VERSIONS](ctx, id: number) {
      await logsService.getVersionsByGAId(id).then((versions) => {
        ctx.commit(SET_VERSIONS, versions);
      });
    },
    async [SET_VERSION](ctx, versionId: number) {
      await logsService.getVersionObjectByVersionId(versionId).then((data) => {
        ctx.commit(SET_VERSION_TREE, JSON.parse(data.ddepartmentIinTree));
      });
    },
  },
  getters: {
    logs(state): ILog[] {
      return state.logs;
    },
    versions(state): IVersion[] {
      return state.versions;
    },
    versionTree(state): ITree | null {
      return state.versionTree;
    },
  },
};
