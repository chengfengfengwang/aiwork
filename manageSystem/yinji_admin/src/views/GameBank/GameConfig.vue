<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewGame" style="margin-right:30px">新建</Button>
      <span style="margin-left:5px">按课程名称筛选：</span>
      <Input
        style="width:200px"
        @input="keywordChange"
        v-model="lessonName"
        placeholder="输入课程名称如：国院第二课"
      />
      <!-- <span style="margin-left:5px">按id筛选：</span>
      <Input style="width:200px" @input="keywordChange" v-model="lessonId" placeholder="按id筛选"/>-->
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="gameList"></Table>
    <div style="margin-top:10px">
      <Page
        @on-page-size-change="pageSizeChange"
        @on-change="pageChange"
        :total="total"
        :page-size="pageSize"
        show-sizer
        :page-size-opts="[5,10,15,20,30,40]"
        show-elevator
      />
    </div>
    <Modal v-model="modalShow" width="1260">
      <p slot="header" style>
        <span>游戏详情</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <!-- <FormItem label="游戏名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入游戏名称"></Input>
          </FormItem>
          <FormItem label="game_type">
            <Input v-model="formValidate.game_type" placeholder="请输入game_type"></Input>
          </FormItem>-->
          <FormItem label="游戏名称" v-show="modalStatus=='create'">
            <Select v-model="formValidate.game_type" placeholder="选择游戏">
              <Option
                v-for="(item,index) in gameNameList"
                :key="index"
                :value="item.type"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="唯一标记">
            <Input v-model="formValidate.sign" placeholder="请输入游戏名称"></Input>
          </FormItem>
          <template v-if="from!=='test'">
            <FormItem label="困难程度" prop="difficulty">
              <Input v-model.number="formValidate.difficulty" placeholder="输入游戏困难程度"></Input>
            </FormItem>
            <FormItem label="展示位置" prop="is_work">
              <Select v-model="formValidate.is_work" placeholder="选择展示位置">
                <Option :value="0">课堂演示</Option>
                <Option :value="1">课后练习</Option>
              </Select>
            </FormItem>
          </template>

          <!-- 击落小鸟游戏配置 -->
          <div v-if="curGame=='jiluoxiaoniao' && modalShow">
            <FormItem label="击落小鸟素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="xiaoniaoBgt"
                v-on:upload-success="xiaoniaoBgtSuccess"
              ></MyUpload>
              <MyUpload
                btnText="上传背景"
                :acceptType="0"
                :defaultFileList="xiaoniaoBg"
                v-on:upload-success="xiaoniaoBgSuccess"
              ></MyUpload>
              <MyUpload
                btnText="上传voice文件"
                :acceptType="1"
                :defaultFileList="xiaoniaoVoice"
                v-on:upload-success="xiaoniaoVoiceSuccess"
              ></MyUpload>
              <!-- <UploadAudioList btnText="唱名音频文件" ref="jlxnAudList" :defaultFileList="jlxnMusicList"></UploadAudioList> -->
            </FormItem>
            <FormItem label="音符列表">
              <JLXN ref="jlxnRef" :arr="xiaoniaoNOTEList"></JLXN>
            </FormItem>
            <FormItem label="是否展示音符名称">
              <Select v-model="jiluoShowName" placeholder="选择类型">
                <Option :value="0">不展示</Option>
                <Option :value="1">展示</Option>
              </Select>
            </FormItem>
            <FormItem label="类型">
              <Select v-model="jiluoType" placeholder="选择类型">
                <Option
                  v-for="(item,index) in jiluoTypeList"
                  :key="index"
                  :value="item.value"
                >{{item.label}}</Option>
              </Select>
            </FormItem>
          </div>
          <!-- 跳一跳游戏配置 -->
          <div v-if="curGame=='tyt' && modalShow">
            <FormItem label="bgt">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="tytBgt"
                v-on:upload-success="tytBgtSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="名称">
              <Input v-model.number="tytName" placeholder></Input>
            </FormItem>
          </div>
          <!-- 灯泡摆放游戏配置 -->
          <div v-if="curGame=='dpbf' && modalShow">
            <FormItem label="类型">
              <Input v-model.number="dpType" placeholder="输入类型值"></Input>
            </FormItem>
          </div>
          <!-- 音准解救小鸟游戏配置 -->
          <div v-if="curGame=='yinzhunxiaoniao'">
            <FormItem label="音准小鸟素材">
              <MyUpload
                btnText="上传bgt文件"
                :acceptType="-1"
                :defaultFileList="yinzhunxiaoniaoBgt"
                v-on:upload-success="yinzhunxiaoniaoBgtSuccess"
              ></MyUpload>
              <MyUpload
                btnText="上传背景音频文件"
                :acceptType="1"
                :defaultFileList="yinzhunxiaoniaoVoice"
                v-on:upload-success="yinzhunxiaoniaoVoiceSuccess"
              ></MyUpload>
              <UploadAudioList ref="yzxnAudList" :defaultFileList="yzxnMusicList"></UploadAudioList>
            </FormItem>
          </div>
          <!-- 音程小鸟游戏配置 -->
          <div v-if="curGame=='ycxn'">
            <FormItem label="音程小鸟背景">
              <MyUpload
                btnText="上传背景文件"
                :acceptType="0"
                :defaultFileList="ycxnBg"
                v-on:upload-success="ycxnBgSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="音程小鸟素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="ycxnBgt"
                v-on:upload-success="ycxnBgtSuccess"
              ></MyUpload>
              <UploadAudioList ref="ycxnAudList" :defaultFileList="ycxnMusicList"></UploadAudioList>
            </FormItem>
            <FormItem label="小鸟个数">
              <Input v-model.number="yinchengBirdNum" placeholder="输入小鸟个数"></Input>
            </FormItem>
          </div>
          <!-- 节奏啄木鸟游戏配置 -->
          <div v-if="curGame=='jzzmn'">
            <FormItem label="节奏啄木鸟素材">
              <!-- <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="ycxnBgt"
                v-on:upload-success="ycxnBgtSuccess"
              ></MyUpload>-->
              <UploadFileList ref="jzzmnBgtList" :defaultFileList="jzzmnBgtList"></UploadFileList>
            </FormItem>
          </div>
          <!-- 摆放小鸟游戏配置 -->
          <div v-if="curGame=='baifangxiaoniao'">
            <FormItem label="摆放小鸟素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="baifangxiaoniaoBgt"
                v-on:upload-success="baifangxiaoniaoBgtSuccess"
              ></MyUpload>
              <MyUpload
                btnText="上传背景音乐"
                :acceptType="1"
                :defaultFileList="baifangxiaoniaoVoice"
                v-on:upload-success="baifangxiaoniaoVoiceSuccess"
              ></MyUpload>
              <UploadAudioList btnText="播报音频文件" ref="bfxnAudList" :defaultFileList="bfxnMusicList"></UploadAudioList>
            </FormItem>
          </div>
          <!-- 节拍游戏游戏配置 -->
          <div v-if="curGame=='jiepai'">
            <FormItem label="素材">
              <MyUpload
                btnText="上传btg文件1"
                :acceptType="-1"
                :defaultFileList="jiepaiBgt"
                v-on:upload-success="jiepaiBgtSuccess"
              ></MyUpload>
              <span @click="jiepaiBgt=[]">删除</span>
              <MyUpload
                btnText="上传btg文件2"
                :acceptType="-1"
                :defaultFileList="jiepaiBgt1"
                v-on:upload-success="jiepaiBgtSuccess1"
              ></MyUpload>
              <span @click="jiepaiBgt1=[]">删除</span>
              <MyUpload
                btnText="上传voice文件"
                :acceptType="1"
                :defaultFileList="jiepaiVoice"
                v-on:upload-success="jiepaiVoiceSuccess"
              ></MyUpload>
              <MyUpload
                btnText="上传背景"
                :acceptType="0"
                :defaultFileList="jiepaiBg"
                v-on:upload-success="jiepaiBgSuccess"
              ></MyUpload>
              <div>
                <Input v-model.number="jiepaiInterval" placeholder="输入间隔时间"></Input>
              </div>
              <span @click="jiepaiVoice=[]">删除</span>
            </FormItem>
          </div>
          <!-- 用鼓打节奏配置 -->
          <div v-if="curGame=='gudajiezou'">
            <FormItem label="用鼓打节奏素材">
              <div>
                <MyUpload
                  btnText="上传btg文件"
                  :acceptType="-1"
                  :defaultFileList="gudajiezouBgt"
                  v-on:upload-success="gudajiezouBgtSuccess"
                ></MyUpload>
                <MyUpload
                  btnText="上传voice文件"
                  :acceptType="1"
                  :defaultFileList="gudajiezouVoice"
                  v-on:upload-success="gudajiezouVoiceSuccess"
                ></MyUpload>
              </div>

              <div>
                <Input v-model.number="guInterval" placeholder="输入间隔时间"></Input>
              </div>
            </FormItem>
          </div>
          <!-- 跳舞的小人配置 -->
          <div v-if="curGame=='tiaowuxr'">
            <FormItem label="跳舞的小人素材">
              <div>
                <MyUpload
                  btnText="上传btg文件"
                  :acceptType="-1"
                  :defaultFileList="tiaowuxrBgt"
                  v-on:upload-success="tiaowuxrBgtSuccess"
                ></MyUpload>
                <MyUpload
                  btnText="上传voice文件"
                  :acceptType="1"
                  :defaultFileList="tiaowuxrVoice"
                  v-on:upload-success="tiaowuxrVoiceSuccess"
                ></MyUpload>
              </div>
              <div>
                <span>是否直接通关：</span>
                <Select v-model="tiaowuxrCanPass" style="width:200px" placeholder>
                  <Option value="0">否</Option>
                  <Option value="1">是</Option>
                </Select>
              </div>
              <div>
                <span>通关所需等级：</span>
                <Select v-model="tiaowuxrPassScore" style="width:200px" placeholder>
                  <Option
                    v-for="item in PassData"
                    :key="item.name"
                    :value="item.value"
                  >{{item.name}}</Option>
                </Select>
              </div>
            </FormItem>
          </div>
          <!-- 太鼓达人配置 -->
          <div v-if="curGame=='tgdr'">
            <FormItem label="太鼓达人素材">
              <div>
                <MyUpload
                  btnText="上传btg文件"
                  :acceptType="-1"
                  :defaultFileList="tgdrBgt"
                  v-on:upload-success="tgdrBgtSuccess"
                ></MyUpload>
                <MyUpload
                  btnText="上传voice文件"
                  :acceptType="1"
                  :defaultFileList="tgdrVoice"
                  v-on:upload-success="tgdrVoiceSuccess"
                ></MyUpload>
              </div>
              <div>
                <span>是否直接通关：</span>
                <Select v-model="tgdrCanPass" style="width:200px" placeholder>
                  <Option value="0">否</Option>
                  <Option value="1">是</Option>
                </Select>
              </div>
              <div>
                <span>通关所需等级：</span>
                <Select v-model="tgdrPassScore" style="width:200px" placeholder>
                  <Option value="A">A</Option>
                  <Option value="S">S</Option>
                  <Option value="SS">SS</Option>
                  <Option value="SSS">SSS</Option>
                </Select>
              </div>
            </FormItem>
          </div>
          <!-- 八分音符配置 -->
          <div v-if="curGame=='bfyf'">
            <FormItem label="素材">
              <div>
                <MyUpload
                  btnText="上传btg文件"
                  :acceptType="-1"
                  :defaultFileList="bfyfBgt"
                  v-on:upload-success="bfyfBgtSuccess"
                ></MyUpload>
                <MyUpload
                  btnText="上传背景音乐文件"
                  :acceptType="1"
                  :defaultFileList="bfyfBgMusic"
                  v-on:upload-success="bfyfBgMusicSuccess"
                ></MyUpload>
              </div>
            </FormItem>
          </div>
          <!-- 跟随光标鱼 -->
          <div v-if="curGame=='gsgby'">
            <FormItem label="素材">
              <div>
                <MyUpload
                  btnText="上传btg文件"
                  :acceptType="-1"
                  :defaultFileList="bfyfBgt"
                  v-on:upload-success="bfyfBgtSuccess"
                ></MyUpload>
                <MyUpload
                  btnText="上传背景音乐文件"
                  :acceptType="1"
                  :defaultFileList="bfyfBgMusic"
                  v-on:upload-success="bfyfBgMusicSuccess"
                ></MyUpload>
                <MyUpload
                  btnText="上传视频"
                  :acceptType="-1"
                  :defaultFileList="gsgbyVideo"
                  v-on:upload-success="gsgbyVideoSuccess"
                ></MyUpload>
              </div>
            </FormItem>
          </div>
          <!-- 保卫家园配置 -->
          <div v-if="curGame=='bwjy'">
            <FormItem label="素材">
              <div>
                <MyUpload
                  btnText="上传btg文件"
                  :acceptType="-1"
                  :defaultFileList="bfyfBgt"
                  v-on:upload-success="bfyfBgtSuccess"
                ></MyUpload>
                <MyUpload
                  btnText="上传背景音乐文件"
                  :acceptType="1"
                  :defaultFileList="bfyfBgMusic"
                  v-on:upload-success="bfyfBgMusicSuccess"
                ></MyUpload>
              </div>
            </FormItem>
            <FormItem label="乐器类型">
              <Select v-model="yqpzInstrucment" placeholder>
                <Option
                  v-for="(value,name) in HechengInstruments"
                  :key="value"
                  :value="value"
                >{{name}}</Option>
              </Select>
            </FormItem>
          </div>
          <!-- 卡牌游戏配置 -->
          <div v-if="curGame=='kapai'">
            <FormItem
              v-for="(card,index) in cardArr"
              :key="card.id"
              class="card_wrapper"
              :label="'卡片'+(index+1)"
            >
              <GameCard :card="card" v-on:delete-card="removeCard(card)" :ref="'card'+index"></GameCard>
            </FormItem>
            <Button type="info" @click="addCard" style="width:240px;margin-left:100px">添加卡片</Button>
          </div>
          <!-- 选择游戏配置 -->
          <div v-if="curGame=='xuanze' || curGame=='jgXuanze'" style="margin-left:40px">
            <GameCommonSelect
              ref="xuanze"
              :additionalInfo="false"
              :initQuestion="formValidate.material_data[0]?formValidate.material_data[0]:{}"
            ></GameCommonSelect>
            <div style="position:relative;left:-45px">
              <FormItem label="选项音频">
                <UploadAudioList
                  btnText="选项音频"
                  ref="xuanzeAudList"
                  :defaultFileList="xuanzeOptionAudios"
                ></UploadAudioList>
              </FormItem>
            </div>
            <div style="position:relative;left:-45px">
              <FormItem label="展示方向">
                <Select v-model="xuanzeDirection" style="width:200px" placeholder="0横1纵">
                  <Option :value="0">横</Option>
                  <Option :value="1">纵</Option>
                </Select>
              </FormItem>
            </div>
            <div v-show="curGame=='jgXuanze'" style="position:relative;left:-45px">
              <FormItem label="考察点">
                <Input v-model="jgxzPoint" placeholder="Enter something..." style="width: 300px"/>
              </FormItem>
            </div>
          </div>
          <!-- 九宫格游戏配置 -->
          <div v-if="curGame=='jiugongge'">
            <FormItem
              v-for="(grid,index) in gridArr"
              :key="grid.id"
              class="card_wrapper"
              :label="'宫格'+(index+1)"
            >
              <Grid :grid="grid" v-on:delete-grid="removeGrid(grid)" :ref="'grid'+index"></Grid>
            </FormItem>
            <Button type="info" @click="addGrid" style="width:240px;margin-left:100px">添加方格</Button>
          </div>
          <!-- 时值游戏配置 -->
          <div v-if="curGame=='shizhi'"></div>
          <!-- 音高游戏配置 -->
          <div v-if="curGame=='yingao' || curGame=='yingao_1'">
            <FormItem label="音高素材">
              <UploadAudioList ref="ygAudList" :defaultFileList="ygList()"></UploadAudioList>
            </FormItem>
          </div>
          <!-- 天平游戏配置 -->
          <div v-if="curGame=='tianping' && modalShow">
            <FormItem label="天平素材">
              <Button type="error" @click="formValidate.material_data=[]">清空</Button>
              <GameBalance ref="gameBalance" :arr="formValidate.material_data"></GameBalance>
            </FormItem>
            <FormItem label="左边小球个数">
              <Input v-model.number="formValidate.count" placeholder="输入游戏里小球的个数3-9个"></Input>
            </FormItem>
          </div>
          <!-- 天平游戏改版配置 -->
          <div v-if="curGame=='tianping_1' && modalShow">
            <FormItem label="天平素材">
              <Button type="error" @click="formValidate.material_data=[]">清空</Button>
              <GameBalance1 ref="gameBalance1" :arr="formValidate.material_data"></GameBalance1>
            </FormItem>
            <FormItem label="左边小球个数">
              <Input v-model.number="formValidate.count" placeholder="输入游戏里小球的个数3-9个"></Input>
            </FormItem>
          </div>
          <div v-if="curGame=='tuozhuai'">
            <FormItem label="拖拽小节线素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="tuozhuaiBgt"
                v-on:upload-success="tuozhuaiBgtSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="拖拽小节列表">
              <Input v-model="tuozhuai_line_index_arr" placeholder="输入需要拖拽的小节，用英文逗号隔开"></Input>
            </FormItem>
          </div>
          <div v-if="curGame=='tuozhuai2' || curGame=='tuozhuai2_1'">
            <FormItem label="拖拽小节id">
              <Input
                style="width:300px;margin-right:10px"
                v-model="tuozhuai2Id"
                placeholder="输入拖拽小节id"
              ></Input>
              <Button @click="searchTuozhuai2">查询</Button>
            </FormItem>
          </div>
          <div v-if="curGame=='qiaoji'">
            <FormItem label="敲击单位拍id">
              <Input style="width:300px;margin-right:10px" v-model="qiaojiId" placeholder="敲击单位拍id"></Input>
              <Button @click="searchQiaoji">查询</Button>
            </FormItem>
          </div>
          <div v-if="curGame=='shichang' && modalShow">
            <FormItem label="视唱游戏素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="shichangBgt"
                v-on:upload-success="shichangBgtSuccess"
              ></MyUpload>
              <MyUpload
                btnText="上传老师示范音频"
                :acceptType="1"
                :defaultFileList="shichangDemoAudio"
                v-on:upload-success="shichangDemoAudioSuccess"
              ></MyUpload>
              <MyUpload
                btnText="上传模唱练习音频"
                :acceptType="1"
                :defaultFileList="shichangModelAudio"
                v-on:upload-success="shichangModelAudioSuccess"
              ></MyUpload>
              <div>
                <span>playMode：</span>
                <Select v-model="playMode" style="width:200px" placeholder="请选择模式">
                  <Option :value="1">视唱/模唱</Option>
                  <Option :value="2">节奏练习</Option>
                </Select>
              </div>

              <div>
                <span>识别起始小节：</span>
                <Input
                  style="width:300px"
                  v-model.number="startMeasureIndex"
                  placeholder="请输入识别起始小节"
                ></Input>
              </div>
              <div>
                <span>速度：</span>
                <Input style="width:300px" v-model.number="shichangSpeed" placeholder="请输入速度数值"></Input>
              </div>
              <div>
                <span>是否需要分段：</span>
                <Input style="width:300px" v-model.number="isNeedSection" placeholder="0不需要，1需要"></Input>
              </div>
              <div>
                <span>分段：</span>
                <Input style="width:300px" v-model="section" placeholder="输入分段，用英文逗号隔开"></Input>
              </div>
              <div>
                <span>是否按音符分段：</span>
                <Input
                  style="width:300px"
                  v-model.number="isNeedNoteSection"
                  placeholder="0不需要，1需要"
                ></Input>
              </div>
              <div>
                <span>按音符分段结束序号：</span>
                <Input style="width:300px" v-model="sectionEndIndex" placeholder="输入分段，用英文逗号隔开"></Input>
              </div>
              <div>
                <span>开始序标：</span>
                <Input style="width:300px" v-model.number="scStartIndex" placeholder="请输入识别起始小节"></Input>
              </div>
              <div>
                <span>分段音频：</span>
                <UploadAudioList ref="scAudList" :defaultFileList="scMusicList"></UploadAudioList>
              </div>
            </FormItem>
            <FormItem label="背景">
              <MyUpload
                btnText="上传背景"
                :acceptType="0"
                :defaultFileList="shichangBg"
                v-on:upload-success="shichangBgSuccess"
              ></MyUpload>
            </FormItem>
          </div>
          <!-- 拼图游戏配置 -->
          <div v-if="curGame=='pintu' && modalShow">
            <FormItem label="乐器组">
              <PutTogetherGroup ref="pintuUploads" :instrumentArr="pintuInstruments"/>
            </FormItem>
            <FormItem label="考察点">
              <Input v-model="pintuGroupName" placeholder/>
            </FormItem>
          </div>
          <!-- 火车游戏配置 -->
          <div v-if="curGame=='huoche' && modalShow">
            <FormItem label="group">
              <HuocheGroup ref="huocheUploads" :groupArr="huocheGroups"/>
            </FormItem>
            <FormItem label="引导音频">
              <MyUpload
                btnText="上传引导音频"
                :acceptType="1"
                :defaultFileList="huocheGuideAudio"
                v-on:upload-success="huocheGuideAudioSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="背景">
              <MyUpload
                btnText="上传背景"
                :acceptType="0"
                :defaultFileList="huocheBg"
                v-on:upload-success="huocheBgSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="分组名称">
              <Input v-model="huocheName" placeholder="分组名称"/>
            </FormItem>
          </div>
          <!-- 送小精灵回家游戏配置 -->
          <div v-if="curGame=='sxjlhj'">
            <FormItem label="送小精灵回家素材">
              <XjlWxp ref="sxjlhjRef" :arr="sxjlhjDataList"></XjlWxp>
            </FormItem>
            <FormItem label="显示窗户">
              <Input v-model="sxjlhjWindow" placeholder/>
            </FormItem>
            <FormItem label="显示小精灵">
              <Input v-model="sxjlhjSprite" placeholder/>
            </FormItem>
          </div>
          <!-- 涂色游戏配置 -->
          <div v-if="curGame=='tuse'">
            <!-- <FormItem label="图片列表">
              <TuSe ref="tuseRef" :arr="tuseImgList"></TuSe>
            </FormItem>-->
            <FormItem label="主图">
              <MyUpload
                btnText="上传主图"
                :acceptType="0"
                :defaultFileList="tuseMainImg"
                v-on:upload-success="tuseMainImgSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="背景音乐">
              <MyUpload
                btnText="上传背景音乐"
                :acceptType="1"
                :defaultFileList="tuseBgMusic"
                v-on:upload-success="tuseBgMusicSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="色板">
              <Input v-model="tuseColors" placeholder/>
            </FormItem>
          </div>
          <!-- 置换拼图游戏配置 -->
          <div v-if="curGame=='zhpt'">
            <FormItem label="图片列表">
              <ZHPT ref="zhptRef" :arr="zhptImgList"></ZHPT>
            </FormItem>
            <FormItem label="倒计时">
              <Input v-model="zhptCountdown" placeholder="单位秒"/>
            </FormItem>
            <FormItem label="完成图片">
              <MyUpload
                btnText="上传完成图片"
                :acceptType="0"
                :defaultFileList="zhptFinishImg"
                v-on:upload-success="zhptFinishImgSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="背景音乐">
              <MyUpload
                btnText="上传背景音乐"
                :acceptType="1"
                :defaultFileList="zhptBgMusic"
                v-on:upload-success="zhptBgMusicSuccess"
              ></MyUpload>
            </FormItem>
          </div>
          <!-- 打擂选择题游戏配置 -->
          <div v-if="curGame=='dlSelect'">
            <FormItem label="素材">
              <DlSelect ref="dlSelect" :groupArr="dlSelectDataList"></DlSelect>
            </FormItem>
            <FormItem label="正确率">
              <Input v-model="dlSelectCRate" placeholder/>
            </FormItem>
            <FormItem label="机器人抢答时间最小值">
              <Input v-model="dlSelectRTimeMin" placeholder/>
            </FormItem>
            <FormItem label="机器人抢答时间最大值">
              <Input v-model="dlSelectRTimeMax" placeholder/>
            </FormItem>
          </div>
          <!-- 找茬游戏配置 -->
          <div v-if="curGame=='zc'">
            <FormItem label="素材">
              <ZC ref="zc" :initQuestion="zcData"></ZC>
            </FormItem>
          </div>
          <!-- 音乐合成配置 -->
          <div v-if="curGame=='hecheng' && modalShow">
            <FormItem label="默认播放乐器">
              <Select multiple v-model="hechengDefaultInstrucments" placeholder="默认播放乐器">
                <Option
                  v-for="(value,name) in HechengInstruments"
                  :key="value"
                  :value="value"
                >{{name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="舞台位置">
              <Input v-model="hechengPosition" placeholder="舞台位置"/>
            </FormItem>
            <FormItem label="默认舞台位置">
              <Input v-model="hechengDefaultPosition" placeholder="默认播放乐器"/>
            </FormItem>
            <FormItem label="倒计时">
              <Input v-model="hechengCountDown" placeholder="单位：秒"/>
            </FormItem>
            <FormItem label="bgt素材">
              <MyUpload
                btnText="上传背景图"
                :acceptType="0"
                :defaultFileList="hechengBg"
                v-on:upload-success="hechengBgSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="音频列表">
              <MusicTogetherGroup ref="hechengUploads" :groupArr="hechengGroups"/>
            </FormItem>
          </div>
          <!-- 非洲鼓配置 -->
          <div v-if="curGame=='feizhougu' && modalShow">
            <FormItem label="bgt素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="feizhouguBgt"
                v-on:upload-success="feizhouguBgtSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="背景音乐">
              <MyUpload
                btnText="上传背景音乐"
                :acceptType="1"
                :defaultFileList="feizhouguBgMusic"
                v-on:upload-success="feizhouguBgMusicSuccess"
              ></MyUpload>
            </FormItem>
          </div>
          <!-- 虚拟乐器配置 -->
          <div v-if="curGame=='xuni' && modalShow">
            <FormItem label="bgt素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="xuniBgt"
                v-on:upload-success="xuniBgtSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="安卓模型">
              <MyUpload
                btnText="上传安卓模型文件"
                :acceptType="-1"
                :defaultFileList="xuniModelAndroid"
                v-on:upload-success="xuniModelAndroidSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="ios模型">
              <MyUpload
                btnText="上传ios模型文件"
                :acceptType="-1"
                :defaultFileList="xuniModelIos"
                v-on:upload-success="xuniModelIosSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="新版ios模型">
              <MyUpload
                btnText="上传新版ios模型文件"
                :acceptType="-1"
                :defaultFileList="xuniModelIos1"
                v-on:upload-success="xuniModelIosSuccess1"
              ></MyUpload>
            </FormItem>
            <FormItem label="模型类型">
              <Select v-model="xuniModelType" placeholder="默认播放乐器">
                <Option
                  v-for="(value,name) in HechengInstruments"
                  :key="value"
                  :value="value"
                >{{name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="持续时间">
              <Input v-model.number="xuniDuration" placeholder="持续时间，单位：秒"/>
            </FormItem>
          </div>
          <!-- 身体打击乐配置 -->
          <div v-if="curGame=='shenti' && modalShow">
            <FormItem label="bgt素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="shentiBgt"
                v-on:upload-success="shentiBgtSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="背景音乐">
              <MyUpload
                btnText="上传背景音乐文件"
                :acceptType="1"
                :defaultFileList="shentiBg"
                v-on:upload-success="shentiBgSuccess"
              ></MyUpload>
            </FormItem>
          </div>
          <!-- 别踩白块配置 -->
          <div v-if="curGame=='bcbk' && modalShow">
            <FormItem label="bgt素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="bcbkBgt"
                v-on:upload-success="bcbkBgtSuccess"
              ></MyUpload>
            </FormItem>
          </div>
          <!-- 乐器拼装配置 -->
          <div v-if="curGame=='yqpz' && modalShow">
            <FormItem label="bgt素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="yqpzBgt"
                v-on:upload-success="yqpzBgtSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="乐器类型">
              <Select v-model="yqpzInstrucment" placeholder>
                <Option
                  v-for="(value,name) in HechengInstruments"
                  :key="value"
                  :value="value"
                >{{name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="倒计时">
              <Input v-model.number="yqpzCountDown" placeholder="单位：秒"></Input>
            </FormItem>
          </div>
          <!-- 跳舞的线配置 -->
          <div v-if="curGame=='twdx' && modalShow">
            <FormItem label="bgt素材">
              <MyUpload
                btnText="上传btg文件"
                :acceptType="-1"
                :defaultFileList="twdxBgt"
                v-on:upload-success="twdxBgtSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="背景音乐">
              <MyUpload
                btnText="上传背景音乐"
                :acceptType="1"
                :defaultFileList="twdxBgMusic"
                v-on:upload-success="twdxBgMusicSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="名称">
              <Input v-model="twdxTitle" placeholder></Input>
            </FormItem>
            <FormItem label="速度">
              <Input v-model="twdxSpeed" placeholder></Input>
            </FormItem>
            <FormItem label="安全宽度">
              <Input v-model="twdxSafeWidth" placeholder></Input>
            </FormItem>
          </div>
          <!-- 生成素养课选择题配置 -->
          <div v-if="curGame=='scsykXuanze' && modalShow">
            <FormItem label="group">
              <SyxzGroup
                ref="scsykXuanzeUploads"
                :isSuyangLesson="isSuyangLesson"
                :name="scsykXuanzeName"
                :groupArr="scsykXuanzeGroups"
              />
            </FormItem>
          </div>
          <!-- 生成素养课排序配置 -->
          <div v-if="curGame=='scsykPaixu' && modalShow">
            <FormItem label="选择题">
              <Button
                v-show="scsykPaixuLoading"
                :loading="scsykPaixuLoading"
                type="info"
                @click="searchScsykXuanze"
              >查询</Button>
              <Select v-model="scsykPaixuGameId" style="width:400px">
                <Option
                  v-for="(item,index) in scsykXuanzeList"
                  :value="item.game_id"
                  :key="index"
                >{{ item.name+' '+item.sign }}</Option>
              </Select>
            </FormItem>
          </div>
          <!-- 灯泡游戏配置 -->
          <div v-if="curGame=='dengpao' || curGame=='dengpao_1'">
            <FormItem label="倒计时">
              <Input v-model="dengpaoCountDown" placeholder="单位：秒"></Input>
            </FormItem>
          </div>
          <!-- 音高测量配置 -->
          <div v-if="curGame=='ygcl'">
            <FormItem label="倒计时">
              <Input v-model="ygclCountDown" placeholder="单位：秒"></Input>
            </FormItem>
          </div>
          <!-- 生成素养课排序配置 -->
          <div v-if="curGame=='tita' && modalShow">
            <FormItem label="bgt">
              <MyUpload
                btnText="上传bgt文件"
                :acceptType="-1"
                :defaultFileList="titaBgt"
                v-on:upload-success="titaBgtSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="背景音乐">
              <MyUpload
                btnText="上传背景音乐"
                :acceptType="1"
                :defaultFileList="titaBgMusic"
                v-on:upload-success="titaBgMusicSuccess"
              ></MyUpload>
            </FormItem>
            <FormItem label="bgt有空拍">
              <Select v-model="titaHaveEmptyBeat" style="width:400px">
                <Option :value="0">无</Option>
                <Option :value="1">有</Option>
              </Select>
            </FormItem>
          </div>
          <!-- 钢琴打飞机配置 -->
          <div v-if="curGame=='gqdfj' && modalShow">
            <FormItem label="bgt">
              <Gqdfj :obj="formValidate.material_data[0]" ref="gqdfj"/>
            </FormItem>
          </div>
          <!-- 捕鱼配置 -->
          <div v-if="curGame=='buyu' && modalShow">
            <FormItem label="素材">
              <Buyu :obj="formValidate.material_data[0]" ref="buyu"/>
            </FormItem>
          </div>
          <!-- 吃彩虹糖配置 -->
          <div v-if="curGame=='ccht' && modalShow">
            <FormItem label="素材">
              <Ccht :obj="formValidate.material_data[0]" ref="ccht"/>
            </FormItem>
          </div>
          <!-- 水果节奏配置 -->
          <div v-if="curGame=='sgjz' && modalShow">
            <FormItem label="素材">
              <Sgjz :obj="formValidate.material_data[0]" ref="sgjz"/>
            </FormItem>
          </div>
          <!-- 节奏游戏配置 -->
          <div v-if="curGame=='jzyx' && modalShow">
            <FormItem label="素材">
              <Jzyx :obj="formValidate.material_data[0]" ref="jzyx"/>
            </FormItem>
          </div>
          <!-- 模拟游戏2d配置 -->
          <div v-if="curGame=='mnyx2d' && modalShow">
            <FormItem label="素材">
              <Mnyx2d :obj="formValidate.material_data[0]" ref="mnyx2d"/>
            </FormItem>
          </div>
          <!-- 节奏按钟配置 -->
          <div v-if="curGame=='jzaz' && modalShow">
            <FormItem label="素材">
              <Jzaz :obj="formValidate.material_data[0]" ref="jzaz"/>
            </FormItem>
          </div>
          <!-- 节奏乐器小火车配置 -->
          <div v-if="curGame=='jzyq' && modalShow">
            <FormItem label="素材">
              <Jzyq :obj="formValidate.material_data[0]" ref="jzyq"/>
            </FormItem>
          </div>
          <!-- 节奏乐器视频配置 -->
          <div v-if="curGame=='jzyqsp' && modalShow">
            <FormItem label="素材">
              <Jzyqsp :obj="formValidate.material_data[0]" ref="jzyqsp"/>
            </FormItem>
          </div>
          <!-- 跟随光标鱼示范配置 -->
          <div v-if="curGame=='gsgbysf' && modalShow">
            <FormItem label="素材">
              <Gsgbysf :obj="formValidate.material_data[0]" ref="gsgbysf"/>
            </FormItem>
          </div>
          <!-- 唱片播放配置 -->
          <div v-if="curGame=='cpbf' && modalShow">
            <FormItem label="素材">
              <Cpbf :obj="formValidate.material_data[0]" ref="cpbf"/>
            </FormItem>
          </div>
          <!-- 非洲鼓创意卡配置 -->
          <div v-if="curGame=='fzgcyk' && modalShow">
            <FormItem label="素材">
              <FzgCyk :obj="formValidate.material_data[0]" ref="fzgcyk"/>
            </FormItem>
          </div>
          <!-- 尤克里里拍照配置 -->
          <div v-if="curGame=='ukulelepz' && modalShow">
            <FormItem label="素材">
              <Ukpz :obj="formValidate.material_data[0]" ref="ukpz"/>
            </FormItem>
          </div>
          <!-- 民乐拍照配置 -->
          <div v-if="curGame=='mypz' && modalShow">
            <FormItem label="素材">
              <Mypz :obj="formValidate.material_data[0]" ref="mypz"/>
            </FormItem>
          </div>
          <!-- 老虎机（节奏回拍）配置 -->
          <div v-if="curGame=='lhjjzhp' && modalShow">
            <FormItem label="素材">
              <Lhjjzhp :obj="formValidate.material_data[0]" ref="lhjjzhp"/>
            </FormItem>
          </div>
          <!-- 老虎机（非洲鼓）配置 -->
          <div v-if="curGame=='lhjfzg' && modalShow">
            <FormItem label="素材">
              <Lhjfzg :obj="formValidate.material_data[0]" ref="lhjfzg"/>
            </FormItem>
          </div>
          <!-- coco回家配置 -->
          <div v-if="curGame=='cocohj' && modalShow">
            <FormItem label="素材">
              <Cocohj :obj="formValidate.material_data[0]" ref="cocohj"/>
            </FormItem>
          </div>
          <!-- 创意节奏-单声部 -->
          <div v-if="curGame=='cyjzd' && modalShow">
            <FormItem label="素材">
              <Cyjzd :obj="formValidate.material_data[0]" ref="cyjzd"/>
            </FormItem>
          </div>
          <template v-if="from!=='test'">
            <FormItem label="是否上线">
              <RadioGroup v-model="formValidate.online">
                <Radio label="true">上线</Radio>
                <Radio label="false">不上线</Radio>
              </RadioGroup>
            </FormItem>
          </template>
          <FormItem label="是否在列表">
            <Select style="width:300px" v-model="formValidate.is_show_list" placeholder>
              <Option :value="1">是</Option>
              <Option :value="0">否</Option>
            </Select>
          </FormItem>
          <FormItem label="热度">
            <Input v-model="formValidate.hot"></Input>
          </FormItem>
          <FormItem label="倒计时">
            <Input v-model.number="formValidate.countdown"></Input>
          </FormItem>
          <FormItem label="通过率">
            <Input v-model.number="formValidate.passRate"></Input>
          </FormItem>
          <FormItem label="通关次数">
            <Input v-model.number="formValidate.clear_times"></Input>
          </FormItem>
           <FormItem label="通关等级">
              <Select v-model="formValidate.clear_level" placeholder="选择展示位置">
                <Option v-for="grade in passGrades" :key="grade.value" :value="grade.value">{{grade.name}}</Option>
              </Select>
            </FormItem>
          <!-- <FormItem label="描述" prop="desc">
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="输入游戏描述"
            ></Input>
          </FormItem>-->
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
const obj = {
  kapai: {
    addCard: () => {
      this.addCard();
    },
    removeCard: () => {
      this.removeCard();
    },
    editCard: () => {
      this.editCard();
    },
    replaceCardArr: () => {
      this.replaceCardArr();
    }
  },
  jiugongge: {
    addGrid: () => {
      this.addGrid();
    },
    editGrid: () => {
      this.editGrid();
    },
    replaceGridArr: () => {
      this.replaceGridArr();
    }
  }
};
const passGrades=[
  {
    name:'A+',
    value:0
  },
  {
    name:'A',
    value:1
  },
  {
    name:'B+',
    value:2
  },
  {
    name:'B',
    value:3
  },
  {
    name:'C+',
    value:4
  },
  {
    name:'D',
    value:6
  },
  {
    name:'E',
    value:7
  },
  {
    name:'F',
    value:8
  },
]
import Gqdfj from "../../components/GqDfj/GqDfj";
import Buyu from "../../components/Buyu/Buyu";
import Sgjz from "../../components/Sgjz/Sgjz";
import Jzyx from "../../components/Jzyx/Jzyx";
import Mnyx2d from "../../components/Mnyx2d/Mnyx2d";
import Jzaz from "../../components/Jzaz/Jzaz";
import Ccht from "../../components/Ccht/Ccht";
import Jzyq from "../../components/Jzyq/Jzyq";
import Jzyqsp from "../../components/Jzyqsp/Jzyqsp";
import Gsgbysf from "../../components/Gsgbysf/Gsgbysf"; 
import Cpbf from "../../components/Cpbf/Cpbf";
import FzgCyk from "../../components/FzgCyk/FzgCyk";
import Ukpz from "../../components/Ukpz/Ukpz";
import Mypz from "../../components/Mypz/Mypz";
import Lhjjzhp from "../../components/Lhjjzhp/Lhjjzhp";
import Lhjfzg from "../../components/Lhjfzg/Lhjfzg";
import Cocohj from "../../components/Cocohj/Cocohj";
import Cyjzd from "../../components/Cyjzd/Cyjzd";
import XjlWxp from "../../components/XjlWxp/XjlWxp";
import GameBalance from "../../components/GameBanlance/GameBalance";
import GameBalance1 from "../../components/GameBanlance/GameBalance1";
import UploadAudioList from "../../components/UploadAudioList";
import UploadFileList from "../../components/UploadFileList";
import GameCard from "../../components/GameCard";
//import Grid from "./../components/Grid";
import Grid from "../../components/NewGrid";
import MyUpload from "../../components/Myupload";
//import GameCommonSelect from "../../components/GameCommonSelect/BasicQuestion";
import GameCommonSelect from "../../components/QuestionBank/Select";
//import UploadGroup from "../../components/UploadGroup/UploadGroup";
import HuocheGroup from "../../components/Huoche/HuocheGroup";
import SyxzGroup from "../../components/Scsyxz/ScsyxzGroup";
import MusicTogetherGroup from "../../components/MusicTogether/MusicTogetherGroup";
//import PutTogether from "../../components/PutTogether/PutTogether";
import PutTogetherGroup from "../../components/PutTogether/PutTogetherGroup";
import DlSelect from "../../components/DlSelect/index";
import ZC from "../../components/ZC/index";
import TuSe from "../../components/TS/tuse";
import ZHPT from "../../components/ZHPT/zhpt";
import JLXN from "../../components/JLXN/JLXN";
import HechengInstruments from "../../assets/instrucmentList.js";
import PassData from "../../assets/passData.js";
import { mapState, mapActions } from "vuex";
import {
  getTagName,
  selectQuestionFilter,
  selectQuestionOption
} from "./../../common/util.js";
export default {
  props: {
    from: {
      default: function() {
        return "self";
      }
    }
  },
  data() {
    return {
      passGrades,
      pintuInstruments: [],
      huocheGroups: [],
      hechengGroups: [],
      scsykXuanzeGroups: [],
      temp: {
        topic_request: "qweqwe",
        topic_main: "",
        topic_voice: "",
        options: ["", "", ""],
        answer: "0",
        answer_detail: "",
        online: "false",
        type: 0,
        tag: ""
      },
      tableLoading: true,
      modalShow: false,
      gameNameList: [],
      formValidate: {
        countdown:60,
        passRate:70
      },
      selectedBalanceNoteArr: [],
      xiaoniaoBgt: [],
      xiaoniaoBg: [],
      xiaoniaoVoice: [],
      jiepaiBgt: [],
      jiepaiBgt1: [],
      gudajiezouBgt: [],
      jiepaiVoice: [],
      jiepaiBg: [],
      gudajiezouVoice: [],
      tiaowuxrBgt: [],
      tiaowuxrCanPass: "0",
      tiaowuxrPassScore: "S",
      tiaowuxrVoice: [],
      tgdrBgt: [],
      bfyfBgt: [],
      gsgbyVideo: [],
      bfyfBgMusic: [],
      tgdrCanPass: "0",
      tgdrPassScore: "S",
      tgdrVoice: [],
      yinzhunxiaoniaoBgt: [],
      titaBgt: [],
      titaBgMusic: [],
      yinzhunxiaoniaoVoice: [],
      baifangxiaoniaoBgt: [],
      tytBgt: [],
      baifangxiaoniaoVoice: [],
      ycxnBgt: [],
      ycxnBg: [],
      tuozhuaiBgt: [],
      tuozhuai_line_index_arr: [],
      section: "",
      sectionEndIndex: "",
      shichangDemoAudio: [],
      shichangModelAudio: [],
      shichangSightAudio: [],
      shichangBgt: [],
      zcData: {},
      balanceNoteArr: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v"
      ],
      curGame: "",
      titaHaveEmptyBeat: 0,
      columns: [
        {
          title: "游戏名称",
          key: "name"
        },
        {
          title: "游戏素材标记",
          key: "sign"
        },
        {
          title: "是否上线",
          key: "online",
          render: (h, params) => {
            return h("div", params.row.online ? "是" : "否");
            //return h("div", params.row.online == "true" ? "是" : "否");
          }
        },
        {
          title: "展示位置",
          key: "is_work",
          render: (h, params) => {
            return h("div", params.row.is_work == 0 ? "课堂演示" : "课后练习");
          }
        },
        {
          title: "通过率",
          key: "passRate"
        },
        {
          title: "倒计时",
          key: "countdown"
        },
        // {
        //   title: "game_type",
        //   key: "game_type"
        // },
        // {
        //   title: "封面",
        //   key: "cover",
        //   className: "cover_row",
        //   render: (h, params) => {
        //     return h("img", {
        //       attrs: {
        //         src: params.row.cover
        //       },
        //       style: {
        //         width: "100%"
        //       }
        //     });
        //   }
        // },
        // {
        //   title: "描述",
        //   key: "desc"
        // },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          //width: 130,
          //maxWidth: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modalShow = true;
                      this.modalCoverShow = true;
                      //this.$refs.formValidate.resetFields();
                      this.formValidate = this.formateRow(params.row);
                      this.modalStatus = "edit";
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      var that = this;
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定要删除吗？",
                        onOk() {
                          that.removeGame(params.row.game_id);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      gameList: [],
      page: 198,
      pageSize: 10,
      total: 0,
      modalCoverShow: "",
      modalStatus: "",
      startMeasureIndex: "",
      scStartIndex: "",
      shichangSpeed: "",
      isNeedSection: "",
      isNeedNoteSection: "",
      playMode: "",
      yzxnMusicList: [],
      ycxnMusicList: [],
      jzzmnBgtList: [],
      sxjlhjDataList: [],
      tuseImgList: [],
      tuseColors: "",
      zhptImgList: [],
      xiaoniaoNOTEList: [],
      zhptCountdown: "",
      zhptFinishImg: [],
      zhptBgMusic: [],
      dlSelectDataList: [],
      dlSelectCRate: "",
      dlSelectRTimeMin: "",
      dlSelectRTimeMax: "",
      scMusicList: [],
      jlxnMusicList: [],
      bfxnMusicList: [],
      xuanzeOptionAudios: [],
      xuanzeDirection: 0,
      jiluoTypeList: [
        {
          label: "人声",
          value: 1
        },
        {
          label: "钢琴",
          value: 2
        }
      ],
      jiluoShowName: 1,
      yinchengBirdNum: "",
      dengpaoCountDown: "",
      ygclCountDown: "",
      dpType: "",
      guInterval: 0,
      jiepaiInterval: 0,
      tuozhuai2Id: "",
      qiaojiId: "",
      tuozhuai2Data: "",
      qiaojiData: "",
      huocheName: "",
      pintuGroupName: "",
      scsykXuanzeName: "",
      hechengDefaultInstrucments: [],
      xuniModelType: "",
      hechengPosition: "",
      sxjlhjWindow: "",
      sxjlhjSprite: "",
      hechengDefaultPosition: "",
      hechengCountDown: "",
      feizhouguBgt: [],
      xuniBgt: [],
      xuniModelAndroid: [],
      xuniModelIos: [],
      xuniModelIos1: [],
      feizhouguBgMusic: [],
      huocheGuideAudio: [],
      shichangBg: [],
      huocheBg: [],
      tuseMainImg: [],
      tuseBgMusic: [],
      shentiBgt: [],
      bcbkBgt: [],
      yqpzBgt: [],
      twdxBgt: [],
      twdxBgMusic: [],
      twdxSpeed: "",
      twdxTitle: "",
      twdxEnvType: "",
      twdxSafeWidth: "2",
      yqpzCountDown: "",
      hechengBg: [],
      shentiBg: [],
      lessonName: "",
      lessonId: "",
      isSuyangLesson: 1,
      scsykXuanzeList: [],
      scsykPaixuGameId: "",
      scsykPaixuLoading: true,
      HechengInstruments: HechengInstruments,
      PassData: PassData,
      xuniDuration: 0,
      yqpzInstrucment: "",
      tytName: ""
    };
  },
  computed: {
    ...mapState(["cardArr", "gridArr", "ygArr"]),
    alSearchTuozhuai2() {
      return Boolean(this.tuozhuai2Data);
    },
    alSearchQiaoji() {
      return Boolean(this.qiaojiData);
    }
  },
  components: {
    GameCard,
    Grid,
    MyUpload,
    GameCommonSelect,
    UploadAudioList,
    UploadFileList,
    GameBalance,
    GameBalance1,
    //UploadGroup,
    HuocheGroup,
    //PutTogether,
    PutTogetherGroup,
    SyxzGroup,
    MusicTogetherGroup,
    XjlWxp,
    DlSelect,
    ZC,
    TuSe,
    ZHPT,
    JLXN,
    Gqdfj,
    FzgCyk,
    Ukpz,
    Mypz,
    Lhjjzhp,
    Lhjfzg,
    Buyu,
    Sgjz,
    Jzyx,
    Mnyx2d,
    Jzaz,
    Ccht,
    Cocohj,
    Cyjzd,
    Jzyq,
    Jzyqsp,
    Gsgbysf,
    Cpbf
  },
  mounted() {
    //this.getProductList();
    this.getGameList();
    this.getNameList();
  },
  methods: {
    ...mapActions([
      "addCard",
      "removeCard",
      "editCard",
      "replaceCardArr",
      "addGrid",
      "removeGrid",
      "editGrid",
      "replaceGridArr",
      "replaceYgArr",
      "emptyYg"
    ]),
    //5c8b7a691f795f2c0daba5bf
    searchScsykXuanze() {
      this.scsykPaixuLoading = true;
      this.axios
        .get(
          `${process.env.JINKANG}/${
            process.env.VERSION
          }/ranking/get_game/?game_type=25`
        )
        .then(res => {
          this.scsykPaixuLoading = false;
          //this.$Message.success("查询成功");
          this.scsykXuanzeList = res.data;
          // this.tuozhuai2Data = res.data;
          // this.tuozhuai2Data.question_id = this.tuozhuai2Id;
        });
    },
    keywordChange() {
      this.page = 0;
      this.getGameList();
    },
    searchTuozhuai2() {
      this.axios
        .get(
          `${process.env.JINKANG}/${
            process.env.VERSION
          }/question/get_section_line_data/?question_id=${this.tuozhuai2Id}`
        )
        .then(res => {
          this.$Message.success("查询成功");
          this.tuozhuai2Data = res.data;
          this.tuozhuai2Data.question_id = this.tuozhuai2Id;
        });
    },
    searchQiaoji() {
      this.axios
        .get(
          `${process.env.JINKANG}/${
            process.env.VERSION
          }/question/get_section_line_data/?question_id=${this.qiaojiId}`
        )
        .then(res => {
          this.$Message.success("查询成功");
          this.qiaojiData = res.data;
          this.qiaojiData.question_id = this.qiaojiId;
        });
    },
    ygList() {
      return this.formValidate.material_data.map(e => {
        return e.data;
      });
    },
    getNameList() {
      this.axios
        .get(
          `${process.env.XIANSHANG}/${process.env.VERSION}/ranking/game_name/`
        )
        .then(res => {
          var obj = res.data;
          this.gameNameObj = res.data;
          var newArr = [];
          for (var key in obj) {
            newArr.push({ name: obj[key], type: key });
          }
          this.gameNameList = newArr;
          //console.log(newArr)
          //this.tableLoading = false;
          //this.gameList = res.data;
        });
    },
    feizhouguBgtSuccess(response, file, fileList) {
      this.feizhouguBgt.splice(0, 1, response.data);
    },
    xuniBgtSuccess(response, file, fileList) {
      this.xuniBgt.splice(0, 1, response.data);
    },
    xuniModelAndroidSuccess(response, file, fileList) {
      this.xuniModelAndroid.splice(0, 1, response.data);
    },
    xuniModelIosSuccess1(response, file, fileList) {
      this.xuniModelIos1.splice(0, 1, response.data);
    },
    xuniModelIosSuccess(response, file, fileList) {
      this.xuniModelIos.splice(0, 1, response.data);
    },
    feizhouguBgMusicSuccess(response, file, fileList) {
      this.feizhouguBgMusic.splice(0, 1, response.data);
    },
    huocheGuideAudioSuccess(response, file, fileList) {
      this.huocheGuideAudio.splice(0, 1, response.data);
    },
    shichangBgSuccess(response, file, fileList) {
      this.shichangBg.splice(0, 1, response.data);
    },
    huocheBgSuccess(response, file, fileList) {
      this.huocheBg.splice(0, 1, response.data);
    },
    tuseMainImgSuccess(response, file, fileList) {
      this.tuseMainImg.splice(0, 1, response.data);
    },
    tuseBgMusicSuccess(response, file, fileList) {
      this.tuseBgMusic.splice(0, 1, response.data);
    },
    zhptFinishImgSuccess(response, file, fileList) {
      this.zhptFinishImg.splice(0, 1, response.data);
    },
    zhptBgMusicSuccess(response, file, fileList) {
      this.zhptBgMusic.splice(0, 1, response.data);
    },
    shentiBgtSuccess(response, file, fileList) {
      this.shentiBgt.splice(0, 1, response.data);
    },
    bcbkBgtSuccess(response, file, fileList) {
      this.bcbkBgt.splice(0, 1, response.data);
    },
    yqpzBgtSuccess(response, file, fileList) {
      this.yqpzBgt.splice(0, 1, response.data);
    },
    twdxBgtSuccess(response, file, fileList) {
      this.twdxBgt.splice(0, 1, response.data);
    },
    twdxBgMusicSuccess(response, file, fileList) {
      this.twdxBgMusic.splice(0, 1, response.data);
    },
    hechengBgSuccess(response, file, fileList) {
      this.hechengBg.splice(0, 1, response.data);
    },
    shentiBgSuccess(response, file, fileList) {
      this.shentiBg.splice(0, 1, response.data);
    },
    xiaoniaoBgtSuccess(response, file, fileList) {
      this.xiaoniaoBgt.splice(0, 1, response.data);
    },
    xiaoniaoBgSuccess(response, file, fileList) {
      this.xiaoniaoBg.splice(0, 1, response.data);
    },
    jiepaiBgtSuccess(response, file, fileList) {
      this.jiepaiBgt.splice(0, 1, response.data);
    },
    jiepaiBgtSuccess1(response, file, fileList) {
      this.jiepaiBgt1.splice(0, 1, response.data);
    },
    gudajiezouBgtSuccess(response, file, fileList) {
      this.gudajiezouBgt.splice(0, 1, response.data);
    },
    tiaowuxrBgtSuccess(response, file, fileList) {
      this.tiaowuxrBgt.splice(0, 1, response.data);
    },
    tgdrBgtSuccess(response, file, fileList) {
      this.tgdrBgt.splice(0, 1, response.data);
    },
    bfyfBgtSuccess(response, file, fileList) {
      this.bfyfBgt.splice(0, 1, response.data);
    },
    gsgbyVideoSuccess(response, file, fileList) {
      this.gsgbyVideo.splice(0, 1, response.data);
    },
    bfyfBgMusicSuccess(response, file, fileList) {
      this.bfyfBgMusic.splice(0, 1, response.data);
    },
    yinzhunxiaoniaoBgtSuccess(response, file, fileList) {
      this.yinzhunxiaoniaoBgt.splice(0, 1, response.data);
    },
    titaBgtSuccess(response, file, fileList) {
      this.titaBgt.splice(0, 1, response.data);
    },
    titaBgMusicSuccess(response, file, fileList) {
      this.titaBgMusic.splice(0, 1, response.data);
    },
    baifangxiaoniaoBgtSuccess(response, file, fileList) {
      this.baifangxiaoniaoBgt.splice(0, 1, response.data);
    },
    tytBgtSuccess(response, file, fileList) {
      this.tytBgt.splice(0, 1, response.data);
    },
    ycxnBgtSuccess(response, file, fileList) {
      this.ycxnBgt.splice(0, 1, response.data);
    },
    ycxnBgSuccess(response, file, fileList) {
      this.ycxnBg.splice(0, 1, response.data);
    },
    tuozhuaiBgtSuccess(response, file, fileList) {
      this.tuozhuaiBgt.splice(0, 1, response.data);
    },
    shichangBgtSuccess(response, file, fileList) {
      this.shichangBgt.splice(0, 1, response.data);
    },
    shichangDemoAudioSuccess(response, file, fileList) {
      this.shichangDemoAudio.splice(0, 1, response.data);
    },
    shichangModelAudioSuccess(response, file, fileList) {
      this.shichangModelAudio.splice(0, 1, response.data);
    },
    shichangSightAudioSuccess(response, file, fileList) {
      this.shichangSightAudio.splice(0, 1, response.data);
    },
    jiepaiVoiceSuccess(response, file, fileList) {
      this.jiepaiVoice.splice(0, 1, response.data);
    },
    jiepaiBgSuccess(response, file, fileList) {
      this.jiepaiBg.splice(0, 1, response.data);
    },
    gudajiezouVoiceSuccess(response, file, fileList) {
      this.gudajiezouVoice.splice(0, 1, response.data);
    },
    tiaowuxrVoiceSuccess(response, file, fileList) {
      this.tiaowuxrVoice.splice(0, 1, response.data);
    },
    tgdrVoiceSuccess(response, file, fileList) {
      this.tgdrVoice.splice(0, 1, response.data);
    },
    xiaoniaoVoiceSuccess(response, file, fileList) {
      this.xiaoniaoVoice.splice(0, 1, response.data);
    },
    yinzhunxiaoniaoVoiceSuccess(response, file, fileList) {
      this.yinzhunxiaoniaoVoice.splice(0, 1, response.data);
    },
    baifangxiaoniaoVoiceSuccess(response, file, fileList) {
      this.baifangxiaoniaoVoice.splice(0, 1, response.data);
    },
    pageChange(page) {
      this.page = page - 1;
      this.getGameList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getGameList();
    },
    getGameList() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.JINKANG}/${
            process.env.VERSION
          }/ranking/get_all_game?page=${this.page}&size=${this.pageSize}&name=${
            this.lessonName
          }&is_test=${this.from === "test" ? 1 : 0}`
        )
        .then(res => {
          this.tableLoading = false;
          this.gameList = res.data;
          this.total = res.total;
        });
    },
    getProductList() {
      this.tableLoading = true;
      this.axios
        .get(
          process.env.JINKANG + "/" + process.env.VERSION + "/goods/get_goods"
        )
        .then(res => {
          this.tableLoading = false;
          this.gameList = res.data;
        });
    },
    handleUpload(file) {
      this.modalCoverShow = true;
      this.file = file;
      this.$set(this.formValidate, "cover", window.URL.createObjectURL(file));
      return false;
    },
    exceededHandle() {
      this.$Message.error("封面最大不能超过1M，请将图片进行压缩优化");
    },
    uploadSuccess(e) {
      console.log(e);
    },
    uploadError(e) {
      console.log(e);
    },
    formateRow(row) {
      var newRow = JSON.parse(JSON.stringify(row));
      newRow.online = newRow.online ? "true" : "false";
      newRow.countdown = newRow.countdown?newRow.countdown:60;
      newRow.passRate = newRow.passRate?newRow.passRate:70;
      newRow.clear_times = newRow.clear_times?newRow.clear_times:0;
      newRow.clear_level = newRow.clear_level?newRow.clear_level:5;
      if (newRow.game_type == 3) {
        this.curGame = "kapai";
      } else if (newRow.game_type == 8) {
        this.curGame = "xuanze";
      } else if (newRow.game_type == 1 || newRow.game_type == 73) {
        this.curGame = "jiluoxiaoniao";
      } else if (newRow.game_type == 9) {
        this.curGame = "yinzhunxiaoniao";
      } else if (newRow.game_type == 10) {
        this.curGame = "baifangxiaoniao";
      } else if (newRow.game_type == 11) {
        this.curGame = "jiepai";
      } else if (newRow.game_type == 2) {
        this.curGame = "ycxn";
      } else if (newRow.game_type == 7 || newRow.game_type == 8) {
        this.curGame = "jiugongge";
      } else if (newRow.game_type == 5) {
        this.curGame = "shizhi";
      } else if (newRow.game_type == 6) {
        this.curGame = "yingao";
      } else if (newRow.game_type == 4) {
        //天平游戏
        this.curGame = "tianping";
      } else if (newRow.game_type == 34) {
        //天平游戏改版
        this.curGame = "tianping_1";
      } else if (newRow.game_type == 13) {
        this.curGame = "tuozhuai";
      } else if (newRow.game_type == 14) {
        this.curGame = "shichang";
      } else if (newRow.game_type == 15) {
        this.curGame = "gudajiezou";
      } else if (newRow.game_type == 16) {
        this.curGame = "tuozhuai2";
      } else if (newRow.game_type == 17) {
        this.curGame = "qiaoji";
      } else if (newRow.game_type == 12) {
        //灯泡摆放
        this.curGame = "dpbf";
      } else if (newRow.game_type == 18) {
        this.curGame = "feizhougu";
      } else if (newRow.game_type == 19) {
        this.curGame = "pintu";
      } else if (newRow.game_type == 20) {
        this.curGame = "huoche";
      } else if (newRow.game_type == 21) {
        this.curGame = "shenti";
      } else if (newRow.game_type == 23 || newRow.game_type == 72) {
        this.curGame = "hecheng";
      } else if (newRow.game_type == 24) {
        this.curGame = "xuni";
      } else if (newRow.game_type == 25) {
        this.curGame = "scsykXuanze";
      } else if (newRow.game_type == 26) {
        this.curGame = "scsykPaixu";
      } else if (newRow.game_type == 27) {
        //节奏啄木鸟
        this.curGame = "jzzmn";
      } else if (newRow.game_type == 28) {
        //乐器拼装
        this.curGame = "yqpz";
      } else if (newRow.game_type == 29) {
        //送小精灵回家
        this.curGame = "sxjlhj";
      } else if (newRow.game_type == 30) {
        //别踩白块
        this.curGame = "bcbk";
      } else if (newRow.game_type == 31) {
        //音高游戏（高低音换UI版）
        this.curGame = "yingao_1";
      } else if (newRow.game_type == 32) {
        //灯泡游戏
        this.curGame = "dengpao_1";
      } else if (newRow.game_type == 33) {
        //tita练习曲
        this.curGame = "tita";
      } else if (newRow.game_type == 35) {
        //拖拽小节线（香肠版）
        this.curGame = "tuozhuai2_1";
      } else if (newRow.game_type == 36) {
        //灯泡游戏（改版）
        this.curGame = "dengpao";
      } else if (newRow.game_type == 37) {
        //跳舞的线
        this.curGame = "twdx";
      } else if (newRow.game_type == 38) {
        //找茬
        this.curGame = "zc";
      } else if (newRow.game_type == 39) {
        //打擂-选择题
        this.curGame = "dlSelect";
      } else if (newRow.game_type == 40) {
        //涂色
        this.curGame = "tuse";
      } else if (newRow.game_type == 41) {
        //跳一跳
        this.curGame = "tyt";
      } else if (newRow.game_type == 42) {
        //太鼓达人
        this.curGame = "tgdr";
      } else if (newRow.game_type == 43) {
        //跳舞的小人
        this.curGame = "tiaowuxr";
      } else if (newRow.game_type == 44) {
        //置换拼图
        this.curGame = "zhpt";
      } else if (newRow.game_type == 45) {
        //八分音符
        this.curGame = "bfyf";
      } else if (newRow.game_type == 46) {
        //音高测量
        this.curGame = "ygcl";
      } else if (newRow.game_type == 47) {
        //跟随光标鱼
        this.curGame = "gsgby";
      } else if (newRow.game_type == 48) {
        //保卫家园
        this.curGame = "bwjy";
      } else if (newRow.game_type == 50) {
        //钢琴-打飞机
        this.curGame = "gqdfj";
      } else if (newRow.game_type == 52) {
        //非洲鼓-创意卡
        this.curGame = "fzgcyk";
      } else if (newRow.game_type == 53) {
        //捕鱼
        this.curGame = "buyu";
      } else if (newRow.game_type == 54) {
        //尤克里里拍照
        this.curGame = "ukulelepz";
      } else if (newRow.game_type == 71) {
        //民乐拍照
        this.curGame = "mypz";
      }else if (newRow.game_type == 55 || newRow.game_type == 66) {
        //coco回家（选择题）
        this.curGame = "cocohj";
      } else if (newRow.game_type == 56) {
        //创意节奏-单声部
        this.curGame = "cyjzd";
      } else if (newRow.game_type == 58) {
        //水果节奏
        this.curGame = "sgjz";
      } else if (newRow.game_type == 59) {
        //吃彩虹糖
        this.curGame = "ccht";
      } else if (newRow.game_type == 60) {
        //老虎机（节奏回拍）
        this.curGame = "lhjjzhp";
      } else if (newRow.game_type == 61) {
        //老虎机（非洲鼓）
        this.curGame = "lhjfzg";
      } else if (newRow.game_type == 62) {
        //节奏乐器（小火车）
        this.curGame = "jzyq";
      } else if (newRow.game_type == 64) {
        //节奏乐器（视频）
        this.curGame = "jzyqsp";
      } else if (newRow.game_type == 65) {
        //跟随光标鱼（示范）
        this.curGame = "gsgbysf";
      } else if (newRow.game_type == 63) {
        this.curGame = "jgXuanze";
      } else if (newRow.game_type == 67) {
        this.curGame = "cpbf";
      } else if (newRow.game_type == 68) {
        //节奏游戏
        this.curGame = "jzyx";
      }else if (newRow.game_type == 69) {
        //模拟游戏2d
        this.curGame = "mnyx2d";
      } else if (newRow.game_type == 70) {
        //节奏按钟
        this.curGame = "jzaz";
      }  
      else {
        this.curGame = "";
      }

      if (this.curGame == "kapai") {
        this.replaceCardArr(newRow.material_data);
      } else if (this.curGame == "jiugongge") {
        this.replaceGridArr(newRow.material_data);
      } else if (this.curGame == "tianping") {
      } else if (this.curGame == "dpbf") {
        this.dpType = newRow.material_data[0]
          ? newRow.material_data[0].dpType
          : "";
      } else if (this.curGame == "jiluoxiaoniao") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.xiaoniaoBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.xiaoniaoBg.splice(0, 1, newRow.material_data[0].bg);
          this.xiaoniaoVoice.splice(0, 1, newRow.material_data[0].voice);
          this.jiluoType = newRow.material_data[0].type;
          this.jiluoShowName = newRow.material_data[0].isShowName;
          this.xiaoniaoNOTEList = newRow.material_data[0].noteList;
          //this.jlxnMusicList = newRow.material_data[0].musicList;
        } else {
          this.xiaoniaoBgt = [];
          this.xiaoniaoBg = [];
          this.xiaoniaoVoice = [];
          this.jiluoType = "";
          this.xiaoniaoNOTEList = [];
          this.jiluoShowName = 1;
        }
      } else if (this.curGame == "yinzhunxiaoniao") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.yinzhunxiaoniaoBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.yinzhunxiaoniaoVoice.splice(0, 1, newRow.material_data[0].voice);
          this.yzxnMusicList = newRow.material_data[0].musicList;
        }
      } else if (this.curGame == "tita") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.titaBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.titaBgMusic.splice(0, 1, newRow.material_data[0].bgMusic);
          this.titaHaveEmptyBeat = newRow.material_data[0].haveEmptyBeat
            ? newRow.material_data[0].haveEmptyBeat
            : 0;
        } else {
          this.titaBgt = [];
          this.titaBgMusic = [];
          this.titaHaveEmptyBeat = 0;
        }
      } else if (this.curGame == "ycxn") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.ycxnBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.ycxnBg.splice(0, 1, newRow.material_data[0].bg);
          this.ycxnMusicList = newRow.material_data[0].musicList;
          this.yinchengBirdNum = newRow.material_data[0].birdNum;
        }
      } else if (this.curGame == "jzzmn") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.jzzmnBgtList = newRow.material_data[0].bgtList;
        }
      } else if (this.curGame == "sxjlhj") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.sxjlhjDataList = newRow.material_data[0].musicList;
          this.sxjlhjWindow = newRow.material_data[0].window
            ? newRow.material_data[0].window.join(",")
            : "";
          this.sxjlhjSprite = newRow.material_data[0].sprite
            ? newRow.material_data[0].sprite.join(",")
            : "";
        } else {
          this.sxjlhjDataList = [];
          this.sxjlhjWindow = "";
          this.sxjlhjSprite = "";
        }
      } else if (this.curGame == "tuse") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          //this.tuseImgList = newRow.material_data[0].imgList;
          this.tuseMainImg.splice(0, 1, newRow.material_data[0].mainImg);
          this.tuseBgMusic.splice(0, 1, newRow.material_data[0].bgMusic);
          this.tuseColors = newRow.material_data[0].colors
            ? newRow.material_data[0].colors.join(",")
            : "";
        } else {
          this.tuseMainImg = [];
          this.tuseBgMusic = [];
          //this.tuseImgList = [];
          this.tuseColors = "";
        }
      } else if (this.curGame == "zhpt") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.zhptImgList = newRow.material_data[0].imgList;
          this.zhptCountdown = newRow.material_data[0].countdown;
          this.zhptFinishImg.splice(0, 1, newRow.material_data[0].finishImg);
          this.zhptBgMusic.splice(0, 1, newRow.material_data[0].bgMusic);
        } else {
          this.zhptFinishImg = [];
          this.zhptImgList = [];
          this.zhptCountdown = "";
          this.zhptBgMusic = [];
        }
      } else if (this.curGame == "dlSelect") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.dlSelectDataList = newRow.material_data[0].selectList;
          this.dlSelectCRate = newRow.material_data[0].correctRate;
          this.dlSelectRTimeMin = newRow.material_data[0].robotTimeMin;
          this.dlSelectRTimeMax = newRow.material_data[0].robotTimeMax;
        } else {
          this.dlSelectDataList = [];
          this.dlSelectCRate = "";
          this.dlSelectRTimeMin = "";
          this.dlSelectRTimeMax = "";
        }
      } else if (this.curGame == "zc") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.zcData = newRow.material_data[0];
        } else {
          this.zcData = {};
        }
      } else if (this.curGame == "baifangxiaoniao") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.baifangxiaoniaoBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.baifangxiaoniaoVoice.splice(0, 1, newRow.material_data[0].voice);
          this.bfxnMusicList = newRow.material_data[0].musicList;
        } else {
          this.baifangxiaoniaoBgt = [];
          this.baifangxiaoniaoVoice = [];
          this.bfxnMusicList = [];
        }
      } else if (this.curGame == "tyt") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.tytBgt.splice(0, 1, newRow.material_data[0].bgtPath);
          this.tytName = newRow.material_data[0].name;
        } else {
          this.tytBgt = [];
          this.tytName = "";
        }
      } else if (this.curGame == "xuanze" || this.curGame == "jgXuanze") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.xuanzeOptionAudios = newRow.material_data[0].optionAudios
            ? newRow.material_data[0].optionAudios
            : [];
          this.xuanzeDirection = newRow.material_data[0].direction;
          this.jgxzPoint = newRow.material_data[0].testPoint;
        } else {
          this.xuanzeOptionAudios = [];
          this.xuanzeDirection = 0;
          this.jgxzPoint = "";
        }
      } else if (this.curGame == "jiepai") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.jiepaiBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.jiepaiBgt1.splice(0, 1, newRow.material_data[0].bgt1);
          this.jiepaiVoice.splice(0, 1, newRow.material_data[0].voice);
          this.jiepaiBg.splice(0, 1, newRow.material_data[0].bg);
          this.jiepaiInterval = newRow.material_data[0].interval;
        } else {
          this.jiepaiBgt = [];
          this.jiepaiBgt1 = [];
          this.jiepaiVoice = [];
          this.jiepaiBg = [];
        }
      } else if (this.curGame == "gudajiezou") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.gudajiezouBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.gudajiezouVoice.splice(0, 1, newRow.material_data[0].voice);
          this.guInterval = newRow.material_data[0].interval;
        }
      } else if (this.curGame == "tiaowuxr") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.tiaowuxrBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.tiaowuxrVoice.splice(0, 1, newRow.material_data[0].bgMusic);
          this.tiaowuxrCanPass = newRow.material_data[0].canPass;
          this.tiaowuxrPassScore = newRow.material_data[0].passScore;
        } else {
          this.tiaowuxrBgt = [];
          this.tiaowuxrVoice = [];
          this.tiaowuxrCanPass = "";
          this.tiaowuxrPassScore = "";
        }
      } else if (this.curGame == "tgdr") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.tgdrBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.tgdrVoice.splice(0, 1, newRow.material_data[0].bgMusic);
          this.tgdrCanPass = newRow.material_data[0].canPass;
          this.tgdrPassScore = newRow.material_data[0].passScore;
        } else {
          this.tgdrBgt = [];
          this.tgdrVoice = [];
          this.tgdrCanPass = "";
          this.tgdrPassScore = "";
        }
      } else if (this.curGame == "bfyf") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.bfyfBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.bfyfBgMusic.splice(0, 1, newRow.material_data[0].bgMusic);
        } else {
          this.bfyfBgt = [];
          this.bfyfBgMusic = [];
        }
      } else if (this.curGame == "gsgby") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.bfyfBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.bfyfBgMusic.splice(0, 1, newRow.material_data[0].bgMusic);
          this.gsgbyVideo.splice(0, 1, newRow.material_data[0].video);
        } else {
          this.bfyfBgt = [];
          this.bfyfBgMusic = [];
          this.gsgbyVideo = [];
        }
      } else if (this.curGame == "bwjy") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.bfyfBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.bfyfBgMusic.splice(0, 1, newRow.material_data[0].bgMusic);
          this.yqpzInstrucment = newRow.material_data[0].instrucment;
        } else {
          this.bfyfBgt = [];
          this.bfyfBgMusic = [];
          this.yqpzInstrucment = "";
        }
      } else if (this.curGame == "tuozhuai") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.tuozhuaiBgt.splice(0, 1, newRow.material_data[0].bgt);
          if (!newRow.material_data[0].line_index_arr) {
            this.tuozhuai_line_index_arr = "";
          } else {
            this.tuozhuai_line_index_arr = newRow.material_data[0].line_index_arr.join(
              ","
            );
          }
        }
      } else if (this.curGame == "shichang") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.shichangBgt.splice(0, 1, newRow.material_data[0].bgt);
          if (!newRow.material_data[0].section) {
            this.section = "";
          } else {
            this.section = newRow.material_data[0].section.join(",");
          }
          if (!newRow.material_data[0].sectionEndIndex) {
            this.sectionEndIndex = "";
          } else {
            this.sectionEndIndex = newRow.material_data[0].sectionEndIndex.join(
              ","
            );
          }
          this.shichangDemoAudio.splice(
            0,
            1,
            newRow.material_data[0].teacherDemoVoice
          );
          this.shichangModelAudio.splice(
            0,
            1,
            newRow.material_data[0].modelVoice
          );
          this.shichangBg.splice(0, 1, newRow.material_data[0].bg);
          this.scMusicList = newRow.material_data[0].musicList;
          //this.shichangSightAudio.splice(0, 1, newRow.material_data[0].sightVoice);
          this.playMode = newRow.material_data[0].playMode;
          this.startMeasureIndex = newRow.material_data[0].startMeasureIndex;
          this.scStartIndex = newRow.material_data[0].starNotetIndex;
          this.shichangSpeed = newRow.material_data[0].speed;
          this.isNeedSection = newRow.material_data[0].isNeedSection;
          this.isNeedNoteSection = newRow.material_data[0].isNeedNoteSection;
        } else {
          this.shichangBg = [];
          this.shichangBgt.splice(0, 1, "");
          this.shichangDemoAudio.splice(0, 1, "");
          this.shichangModelAudio.splice(0, 1, "");
          this.shichangSightAudio.splice(0, 1, "");
          this.playMode = "";
          this.startMeasureIndex = "";
          this.scStartIndex = "";
          this.shichangSpeed = "";
          this.isNeedSection = "";
          this.isNeedNoteSection = "";
        }
      } else if (this.curGame == "tuozhuai2" || this.curGame == "tuozhuai2_1") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.tuozhuai2Id = newRow.material_data[0].question_id;
        }
      } else if (this.curGame == "qiaoji") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.qiaojiId = newRow.material_data[0].question_id;
        } else {
          this.qiaojiId = "";
        }
      } else if (this.curGame == "huoche") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.huocheGroups = newRow.material_data[0].groupArr;
          this.huocheName = newRow.material_data[0].name;
          this.huocheGuideAudio.splice(
            0,
            1,
            newRow.material_data[0].guideAudio
          );
          this.huocheBg.splice(0, 1, newRow.material_data[0].bg);
        } else {
          this.huocheGroups = [];
          this.huocheName = "";
          this.huocheGuideAudio = [];
          this.huocheBg = [];
        }
      } else if (this.curGame == "scsykXuanze") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.scsykXuanzeGroups = newRow.material_data[0].groupArr;
          this.scsykXuanzeName = newRow.material_data[0].name;
          this.isSuyangLesson = newRow.material_data[0].isSuyangLesson;
        } else {
          this.scsykXuanzeGroups = [];
          this.scsykXuanzeName = "";
          this.isSuyangLesson = 1;
        }
      } else if (this.curGame == "scsykPaixu") {
        this.searchScsykXuanze();
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.scsykPaixuGameId = newRow.material_data[0].id
            ? newRow.material_data[0].id
            : "";
        } else {
          this.scsykPaixuGameId = "";
        }
      } else if (this.curGame == "pintu") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          //this.pintuInstruments = newRow.material_data[0].pieceArr;
          this.pintuInstruments = newRow.material_data[0].instrumentArr;
          this.pintuGroupName = newRow.material_data[0].groupName;
        } else {
          this.pintuInstruments = [];
          this.pintuGroupName = "";
        }
      } else if (this.curGame == "hecheng") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.hechengGroups = newRow.material_data[0].musicArr;
          this.hechengDefaultInstrucments =
            newRow.material_data[0].defaultInstrucments;
          this.hechengPosition = newRow.material_data[0].position.join(",");
          this.hechengDefaultPosition = newRow.material_data[0].defaultPosition.join(
            ","
          );
          this.hechengCountDown = newRow.material_data[0].countDown;
          this.hechengBg.splice(0, 1, newRow.material_data[0].bg);
        } else {
          this.hechengGroups = [];
          this.hechengDefaultInstrucments = [];
          this.hechengPosition = "";
          this.hechengDefaultPosition = "";
          this.hechengCountDown = "";
          this.hechengBg = [];
        }
      } else if (this.curGame == "feizhougu") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.feizhouguBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.feizhouguBgMusic.splice(0, 1, newRow.material_data[0].bgMusic);
        } else {
          this.feizhouguBgt = [];
          this.feizhouguBgMusic = [];
        }
      } else if (this.curGame == "xuni") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.xuniBgt.splice(0, 1, newRow.material_data[0].bgtPath);
          this.xuniModelAndroid.splice(
            0,
            1,
            newRow.material_data[0].assetsBundleAndroid
          );
          this.xuniModelIos.splice(
            0,
            1,
            newRow.material_data[0].assetsBundleIos
          );
          this.xuniModelIos1.splice(
            0,
            1,
            newRow.material_data[0].assetsBundleIos1
          );
          this.xuniModelType = newRow.material_data[0].modelType;
          this.xuniDuration = newRow.material_data[0].duration;
        } else {
          this.xuniBgt = [];
          this.xuniModelAndroid = [];
          this.xuniModelIos = [];
          this.xuniModelIos1 = [];
          this.xuniModelType = "";
          this.xuniDuration = 0;
        }
      } else if (this.curGame == "shenti") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.shentiBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.shentiBg.splice(0, 1, newRow.material_data[0].bgMusic);
        } else {
          this.shentiBgt = [];
          this.shentiBg = [];
        }
      } else if (this.curGame == "bcbk") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.bcbkBgt.splice(0, 1, newRow.material_data[0].bgt);
        } else {
          this.bcbkBgt = [];
        }
      } else if (this.curGame == "yqpz") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.yqpzBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.yqpzCountDown = newRow.material_data[0].countdown;
          this.yqpzInstrucment = newRow.material_data[0].instrucment;
        } else {
          this.yqpzBgt = [];
          this.yqpzCountDown = "";
          this.yqpzInstrucment = "";
        }
      } else if (this.curGame == "twdx") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.twdxBgt.splice(0, 1, newRow.material_data[0].bgt);
          this.twdxBgMusic.splice(0, 1, newRow.material_data[0].bgMusic);
          this.twdxSpeed = newRow.material_data[0].speed;
          this.twdxTitle = newRow.material_data[0].title;
          this.twdxSafeWidth = newRow.material_data[0].safeWidth;
        } else {
          this.twdxBgt = [];
          this.twdxBgMusic = [];
          this.twdxSpeed = "";
          this.twdxTitle = "";
          this.twdxSafeWidth = "";
        }
      } else if (this.curGame == "dengpao" || this.curGame == "dengpao_1") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.dengpaoCountDown = newRow.material_data[0].countDown;
        }
      } else if (this.curGame == "ygcl") {
        if (newRow.material_data && newRow.material_data.length > 0) {
          this.ygclCountDown = newRow.material_data[0].countdown;
        }
      }
      return newRow;
    },

    formateMaterialData(material_data) {
      var myMaterialData = JSON.parse(JSON.stringify(material_data));
      return JSON.stringify(myMaterialData);
    },
    getProductDetail(id) {
      this.axios
        .get(
          process.env.JINKANG + "/" + process.env.VERSION + "/goods?id=" + id
        )
        .then(res => {
          this.tableLoading = false;
          this.getProductList();
        });
    },
    removeGame(id) {
      this.axios
        .get(
          process.env.JINKANG +
            "/" +
            process.env.VERSION +
            "/ranking/delete_game/?game_id=" +
            id
        )
        .then(res => {
          this.getGameList();
        });
    },
    createNewGame() {
      //this.modalCoverShow = false;
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
      this.curGame = "";
    },
    handleSubmit(name) {
      var formdata = this.formatForm();
      //return
      if (this.curGame == "tuozhuai2" && !this.alSearchTuozhuai2) {
        alert("请先查询id");
        return;
      }
      if (this.curGame == "tuozhuai2_1" && !this.alSearchTuozhuai2) {
        alert("请先查询id");
        return;
      }
      if (this.curGame == "qiaoji" && !this.alSearchQiaoji) {
        alert("请先查询id");
        return;
      }
      if (!formdata) {
        return;
      }
      if (this.from === "test") {
        formdata.append("is_test", 1);
      }
      this.axios
        .post(
          `${process.env.JINKANG}/${
            process.env.VERSION
          }/ranking/create_or_update_game/`,
          formdata
        )
        .then(res => {
          //this.$Message.success("创建成功啦!");
          this.modalShow = false;
          this.tuozhuai2Data = "";
          this.qiaojiData = "";
          //this.file = "";
          this.getGameList();
        });
    },
    formatForm() {
      var error = false;
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      console.log(newForm);
      if (this.modalStatus == "create") {
        ["count", "material_data"].forEach(e => {
          delete newForm[e];
        });
      } else {
        ["data", "material", "_index", "_rowKey"].forEach(e => {
          delete newForm[e];
        });
        //从vuex获取material_data,准备提交给服务器
        if (this.curGame == "kapai") {
          var myGameArr = JSON.parse(JSON.stringify(this.cardArr));
          myGameArr.forEach(e => {
            e.status = e.status + "";
          });
          newForm.material_data = this.formateMaterialData(
            JSON.parse(JSON.stringify(myGameArr))
          );
          newForm.count = myGameArr.length;
        } else if (this.curGame == "jiugongge") {
          var myGameArr = JSON.parse(JSON.stringify(this.gridArr));
          newForm.material_data = this.formateMaterialData(
            JSON.parse(JSON.stringify(myGameArr))
          );
          newForm.count = myGameArr.length;
        } else if (this.curGame == "yingao") {
          var myGameArr = this.$refs.ygAudList.myFileList.map(e => {
            return { data: e };
          });
          newForm.material_data = JSON.stringify(myGameArr);
          newForm.count = myGameArr.length;
        } else if (this.curGame == "yingao_1") {
          var myGameArr = this.$refs.ygAudList.myFileList.map(e => {
            return { data: e };
          });
          newForm.material_data = JSON.stringify(myGameArr);
          newForm.count = myGameArr.length;
        } else if (this.curGame == "tianping") {
          var arr = this.$refs.gameBalance.submit();
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "gqdfj") {
          var obj = this.$refs.gqdfj.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "buyu") {
          var obj = this.$refs.buyu.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "sgjz") {
          var obj = this.$refs.sgjz.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        }  else if (this.curGame == "jzyx") {
          var obj = this.$refs.jzyx.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        }  else if (this.curGame == "mnyx2d") {
          var obj = this.$refs.mnyx2d.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "jzaz") {
          var obj = this.$refs.jzaz.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        }else if (this.curGame == "ccht") {
          var obj = this.$refs.ccht.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "jzyq") {
          var obj = this.$refs.jzyq.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "jzyqsp") {
          var obj = this.$refs.jzyqsp.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "gsgbysf") {
          var obj = this.$refs.gsgbysf.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        }else if (this.curGame == "cpbf") {
          var obj = this.$refs.cpbf.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "fzgcyk") {
          var obj = this.$refs.fzgcyk.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "ukulelepz") {
          var obj = this.$refs.ukpz.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        }else if (this.curGame == "mypz") {
          var obj = this.$refs.mypz.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "lhjjzhp") {
          var obj = this.$refs.lhjjzhp.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "lhjfzg") {
          var obj = this.$refs.lhjfzg.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "cocohj") {
          var obj = this.$refs.cocohj.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "cyjzd") {
          var obj = this.$refs.cyjzd.submit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "tianping_1") {
          var arr = this.$refs.gameBalance1.submit();
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "jiluoxiaoniao") {
          var obj = {
            bgt: this.xiaoniaoBgt[0],
            bg: this.xiaoniaoBg[0],
            voice: this.xiaoniaoVoice[0],
            type: this.jiluoType,
            noteList: this.$refs.jlxnRef.myArr,
            isShowName: this.jiluoShowName
            //musicList: this.$refs.jlxnAudList.myFileList
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "dpbf") {
          var obj = {
            dpType: this.dpType
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "yinzhunxiaoniao") {
          var obj = {
            bgt: this.yinzhunxiaoniaoBgt[0],
            voice: this.yinzhunxiaoniaoVoice[0],
            musicList: this.$refs.yzxnAudList.myFileList
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "tita") {
          var obj = {
            bgt: this.titaBgt[0],
            bgMusic: this.titaBgMusic[0],
            haveEmptyBeat: this.titaHaveEmptyBeat
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "ycxn") {
          var obj = {
            bgt: this.ycxnBgt[0],
            bg: this.ycxnBg[0],
            musicList: this.$refs.ycxnAudList.myFileList,
            birdNum: this.yinchengBirdNum
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "jzzmn") {
          var obj = {
            bgtList: this.$refs.jzzmnBgtList.myFileList
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "sxjlhj") {
          var obj = {
            musicList: this.$refs.sxjlhjRef.myArr,
            window: this.sxjlhjWindow.split(","),
            sprite: this.sxjlhjSprite.split(",")
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "tuse") {
          var obj = {
            //imgList: this.$refs.tuseRef.myArr,
            colors: this.tuseColors.split(","),
            mainImg: this.tuseMainImg[0],
            bgMusic: this.tuseBgMusic[0]
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "zhpt") {
          var obj = {
            imgList: this.$refs.zhptRef.myArr,
            countdown: this.zhptCountdown,
            finishImg: this.zhptFinishImg[0],
            bgMusic: this.zhptBgMusic[0]
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "zc") {
          var obj = this.$refs.zc.handleSubmit();
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "dlSelect") {
          var obj = {
            selectList: this.$refs.dlSelect.myGroupArr,
            correctRate: this.dlSelectCRate,
            robotTimeMin: this.dlSelectRTimeMin,
            robotTimeMax: this.dlSelectRTimeMax
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "jiepai") {
          var obj = {
            bgt: this.jiepaiBgt[0],
            bgt1: this.jiepaiBgt1[0],
            voice: this.jiepaiVoice[0],
            bg: this.jiepaiBg[0],
            interval: this.jiepaiInterval
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "gudajiezou") {
          var obj = {
            bgt: this.gudajiezouBgt[0],
            voice: this.gudajiezouVoice[0],
            interval: this.guInterval
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "tiaowuxr") {
          var obj = {
            bgt: this.tiaowuxrBgt[0],
            bgMusic: this.tiaowuxrVoice[0],
            canPass: this.tiaowuxrCanPass,
            passScore: this.tiaowuxrPassScore
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "tgdr") {
          var obj = {
            bgt: this.tgdrBgt[0],
            bgMusic: this.tgdrVoice[0],
            canPass: this.tgdrCanPass,
            passScore: this.tgdrPassScore
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "bfyf") {
          var obj = {
            bgt: this.bfyfBgt[0],
            bgMusic: this.bfyfBgMusic[0]
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "gsgby") {
          var obj = {
            bgt: this.bfyfBgt[0],
            bgMusic: this.bfyfBgMusic[0],
            video: this.gsgbyVideo[0]
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "bwjy") {
          var obj = {
            bgt: this.bfyfBgt[0],
            bgMusic: this.bfyfBgMusic[0],
            instrucment: this.yqpzInstrucment
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "baifangxiaoniao") {
          var obj = {
            bgt: this.baifangxiaoniaoBgt[0],
            voice: this.baifangxiaoniaoVoice[0],
            musicList: this.$refs.bfxnAudList.myFileList
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "tyt") {
          var obj = {
            bgtPath: this.tytBgt[0],
            name: this.tytName
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "tuozhuai") {
          var tuozhuaiArr = [];
          this.tuozhuai_line_index_arr.split(",").forEach(e => {
            if (e.indexOf("，") != -1) {
              this.$Message.error("请将中文逗号换成英文逗号");
              error = true;
            } else {
              var item = (e + "").trim();
              tuozhuaiArr.push(item);
            }
          });

          var obj = { bgt: this.tuozhuaiBgt[0], line_index_arr: tuozhuaiArr };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "shichang") {
          var sectionArr = [];
          var sectionEndIndexArr = [];

          this.section.split(",").forEach(e => {
            if (e.indexOf("，") != -1) {
              this.$Message.error("请将中文逗号换成英文逗号");
              error = true;
            } else {
              var item = Number((e + "").trim());
              sectionArr.push(item);
            }
          });
          this.sectionEndIndex.split(",").forEach(e => {
            if (e.indexOf("，") != -1) {
              this.$Message.error("请将中文逗号换成英文逗号");
              error = true;
            } else {
              var item = Number((e + "").trim());
              sectionEndIndexArr.push(item);
            }
          });
          var obj = {
            section: sectionArr,
            sectionEndIndex: sectionEndIndexArr,
            startMeasureIndex: this.startMeasureIndex,
            starNotetIndex: this.scStartIndex,
            speed: this.shichangSpeed,
            isNeedSection: this.isNeedSection,
            isNeedNoteSection: this.isNeedNoteSection,
            playMode: this.playMode,
            bgt: this.shichangBgt[0],
            teacherDemoVoice: this.shichangDemoAudio[0],
            modelVoice: this.shichangModelAudio[0],
            bg: this.shichangBg[0],
            musicList: this.$refs.scAudList.myFileList
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "xuanze" || this.curGame == "jgXuanze") {
          var arr = [];
          arr[0] = selectQuestionFilter(this.$refs.xuanze.question);
          arr[0].optionAudios = this.$refs.xuanzeAudList.myFileList;
          arr[0].direction = this.xuanzeDirection;
          arr[0].testPoint = this.jgxzPoint;
          newForm.material_data = JSON.stringify(arr);
        } else if (
          this.curGame == "tuozhuai2" ||
          this.curGame == "tuozhuai2_1"
        ) {
          var arr = [];
          arr[0] = this.tuozhuai2Data;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "qiaoji") {
          var arr = [];
          arr[0] = this.qiaojiData;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "huoche") {
          var arr = [];
          arr[0] = {
            groupArr: this.$refs.huocheUploads.myGroupArr,
            name: this.huocheName,
            guideAudio: this.huocheGuideAudio[0],
            bg: this.huocheBg[0]
          };
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "scsykXuanze") {
          var arr = [];
          arr[0] = {
            groupArr: this.$refs.scsykXuanzeUploads.myGroupArr,
            isSuyangLesson: this.$refs.scsykXuanzeUploads.isSuyangLesson,
            name: this.$refs.scsykXuanzeUploads.myName
          };
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "scsykPaixu") {
          var index = this.scsykXuanzeList.findIndex(e => {
            if (e.game_id == this.scsykPaixuGameId) {
              return true;
            }
          });
          var param = JSON.parse(
            JSON.stringify(this.scsykXuanzeList[index].material_data)
          );
          param[0].id = this.scsykPaixuGameId;
          newForm.material_data = JSON.stringify(param);
        } else if (this.curGame == "pintu") {
          var arr = [];
          arr[0] = {
            //pieceArr:this.$refs.pintuUploads.myDataList
            instrumentArr: this.$refs.pintuUploads.myInstrumentArr,
            groupName: this.pintuGroupName
          };
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "hecheng") {
          var arr = [];
          arr[0] = {
            musicArr: this.$refs.hechengUploads.myGroupArr,
            position: this.hechengPosition.split(","),
            defaultPosition: this.hechengDefaultPosition.split(","),
            countDown: this.hechengCountDown,
            defaultInstrucments: this.hechengDefaultInstrucments,
            bg: this.hechengBg[0]
          };
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "feizhougu") {
          var arr = [];
          arr[0] = {
            bgt: this.feizhouguBgt[0],
            bgMusic: this.feizhouguBgMusic[0]
          };
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "xuni") {
          var arr = [];
          arr[0] = {
            soundPath: "http://cdn.kids.immusician.com/app/resource/sound.sf2",
            bgtPath: this.xuniBgt[0],
            modelType: this.xuniModelType,
            duration: this.xuniDuration,
            assetsBundleAndroid: this.xuniModelAndroid[0],
            assetsBundleIos: this.xuniModelIos[0],
            assetsBundleIos1: this.xuniModelIos1[0] ? this.xuniModelIos1[0] : ""
          };
          console.log(arr[0]);

          newForm.material_data = JSON.stringify(arr);
          console.log(newForm.material_data);
          //return
        } else if (this.curGame == "shenti") {
          var arr = [];
          arr[0] = {
            bgt: this.shentiBgt[0],
            bgMusic: this.shentiBg[0]
          };
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "bcbk") {
          var arr = [];
          arr[0] = {
            bgt: this.bcbkBgt[0]
          };
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "yqpz") {
          var arr = [];
          arr[0] = {
            bgt: this.yqpzBgt[0],
            countdown: this.yqpzCountDown,
            instrucment: this.yqpzInstrucment
          };
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "twdx") {
          var arr = [];
          arr[0] = {
            bgt: this.twdxBgt[0],
            bgMusic: this.twdxBgMusic[0],
            speed: this.twdxSpeed,
            title: this.twdxTitle,
            safeWidth: this.twdxSafeWidth
          };
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "dengpao" || this.curGame == "dengpao_1") {
          var obj = {
            countDown: this.dengpaoCountDown
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        } else if (this.curGame == "ygcl") {
          var obj = {
            countdown: this.ygclCountDown
          };
          var arr = [];
          arr[0] = obj;
          newForm.material_data = JSON.stringify(arr);
        }
      }
      newForm.online = newForm.online == "true" ? "1" : "0";
      newForm.is_show_list = newForm.is_show_list;
      // newForm.hot = newForm.hot;
      // newForm.name = this.gameNameObj[newForm.game_type];
      //console.log(newForm)
      var myFormData = new FormData();
      for (var key in newForm) {
        myFormData.append(key, newForm[key]);
      }
      if (error) {
        return false;
      } else {
        return myFormData;
      }
    }
  },
  watch: {
    yqpzInstrucment(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="less">
.card_wrapper:hover {
  .close_icon {
    display: block;
  }
  //background-color: rgba(0, 0, 0, 0.2)
}
.balance_note_wrapper {
  width: 145px;
  margin: 20px 0px;
}
.balance_note {
  //max-width: 100px;
  max-width: 70px;
  max-height: 70px;
}
</style>

