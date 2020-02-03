<template>
  <div>
    <CommonTable itemName="师训" :tableConfig="videoTableConfig" :formConfig="videoFormConfig"/>
    <CommonTable itemName="师训类型" :tableConfig="typeTableConfig" :formConfig="typeFormConfig"/>
  </div>
</template>
<script>
const findIndex = require("lodash.findindex");
import CommonTable from "./../../components/CommonTable/CommonTable";
export default {
  data() {
    return {
      videoFormConfig: [
        {
          title: "名称",
          key: "name",
          type: "String"
        },
        {
          title: "封面",
          key: "cover_url",
          type: "img"
        },
        {
          title: "视频",
          key: "video_url",
          type: "video"
        },
        {
          title: "师训类型",
          key: "guide_type",
          type: "Array"
        },
        {
          title: "乐器类型",
          key: "instrument_type",
          type: "String"
        },
        {
          title: "排序",
          key: "order",
          type: "Number"
        },
        {
          title: "操作",
          key: "edit",
          type: "edit"
        }
      ],
      videoTableConfig: {
        getData: {
          method: "get",
          url: `${process.env.TEACHER_VIDEO}/guides/`
        },
        createData: {
          method: "put",
          url: `${process.env.TEACHER_VIDEO}/guides/`
        },
        editData: {
          method: "post",
          url: `${process.env.TEACHER_VIDEO}/guides/update`
        }
      },
      typeFormConfig: [
        {
          title: "名字",
          key: "title",
          type: "String"
        },
        {
          title: "封面",
          key: "cover_url",
          type: "img"
        },
        {
          title: "course_id",
          key: "course_id",
          type: "String"
        },
        {
          title: "label",
          key: "label",
          type: "Array"
        },
        {
          title: "instrument_type",
          key: "instrument_type",
          type: "String"
        }
      ],
      typeTableConfig: {
        getData: {
          method: "get",
          url: `${process.env.TEACHER_VIDEO}/guides/types`
        },
        createData: {
          method: "put",
          url: `${process.env.TEACHER_VIDEO}/guides/types/`
        }
      }
    };
  },
  components: {
    CommonTable
  },
  mounted() {
    this.getGuideTypeList();
    this.getVideoLabels();
  },
  methods: {
    getVideoLabels() {
      this.axios.get(`${process.env.TEACHER_VIDEO}/guides/labels`).then(res => {
        this.videoLabels = res.data;
        this.changeLabelList();
      });
    },
    changeLabelList() {
      let myList = this.videoLabels.map(e => {
        return {
          label: e.name,
          value: e.id
        };
      });
      const index = findIndex(this.typeFormConfig, function(o) {
        return o.key == "label";
      });
      const that = this;
      this.typeFormConfig.splice(
        index,
        1,
        Object.assign(this.typeFormConfig[index], {
          options: this.videoLabels
        })
      );
    },
    getGuideTypeList() {
      this.axios.get(`${process.env.TEACHER_VIDEO}/guides/types`).then(res => {
        this.typeList = res.data;
        this.changeTypeList();
      });
    },
    changeTypeList() {
      let myTypeList = this.typeList.map(e => {
        return {
          name: e.title,
          id: e._id
        };
      });
      const index = findIndex(this.videoFormConfig, function(o) {
        return o.key == "guide_type";
      });
      const that = this;
      this.videoFormConfig.splice(
        index,
        1,
        Object.assign(this.videoFormConfig[index], {
          options: myTypeList
        })
      );
    }
  }
};
</script>
