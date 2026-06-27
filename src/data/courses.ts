export interface Lesson {
  id: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  title: string;
  content: VocabularyContent | GrammarContent | SpeakingContent | ListeningContent;
  completed: boolean;
  expReward: number;
}
export interface VocabularyContent { words: Word[]; }
export interface Word {
  id: string; term: string; translation: string; pronunciation: string;
  example: string; exampleTranslation: string;
}
export interface GrammarContent { rules: GrammarRule[]; exercises: GrammarExercise[]; }
export interface GrammarRule { id: string; title: string; explanation: string; examples: string[]; }
export interface GrammarExercise { id: string; question: string; options: string[]; correctAnswer: string; explanation: string; }
export interface SpeakingContent { prompt: string; targetSentence: string; allowedAttempts: number; }
export interface ListeningContent { audioUrl: string; transcript: string; questions: ListeningQuestion[]; }
export interface ListeningQuestion { id: string; question: string; options: string[]; correctAnswer: string; }
export interface Unit { id: string; title: string; description: string; lessons: Lesson[]; progress: number; }
export interface Course {
  id: string; language: string; languageName: string; flag: string;
  level: string; levelName: string; description: string;
  units: Unit[]; totalHours: number; enrolledCount: number; color: string;
}

const L = [{"code":"english","name":"英语","flag":"🇬🇧","color":"#4ecdc4"},{"code":"japanese","name":"日语","flag":"🇯🇵","color":"#ff6b35"},{"code":"korean","name":"韩语","flag":"🇰🇷","color":"#1a1f3a"},{"code":"french","name":"法语","flag":"🇫🇷","color":"#002395"},{"code":"spanish","name":"西班牙语","flag":"🇪🇸","color":"#AA151B"},{"code":"german","name":"德语","flag":"🇩🇪","color":"#000000"},{"code":"italian","name":"意大利语","flag":"🇮🇹","color":"#009246"},{"code":"portuguese","name":"葡萄牙语","flag":"🇵🇹","color":"#006600"},{"code":"russian","name":"俄语","flag":"🇷🇺","color":"#D52B1E"},{"code":"arabic","name":"阿拉伯语","flag":"🇸🇦","color":"#006c35"},{"code":"hindi","name":"印地语","flag":"🇮🇳","color":"#FF9933"},{"code":"thai","name":"泰语","flag":"🇹🇭","color":"#A51931"},{"code":"vietnamese","name":"越南语","flag":"🇻🇳","color":"#DA251D"},{"code":"turkish","name":"土耳其语","flag":"🇹🇷","color":"#E30A17"},{"code":"dutch","name":"荷兰语","flag":"🇳🇱","color":"#FF6600"},{"code":"polish","name":"波兰语","flag":"🇵🇱","color":"#DC143C"},{"code":"swedish","name":"瑞典语","flag":"🇸🇪","color":"#006AA7"},{"code":"greek","name":"希腊语","flag":"🇬🇷","color":"#0D5EAF"},{"code":"indonesian","name":"印尼语","flag":"🇮🇩","color":"#FF0000"},{"code":"malay","name":"马来语","flag":"🇲🇾","color":"#010066"},{"code":"tagalog","name":"菲律宾语","flag":"🇵🇭","color":"#0038A8"},{"code":"swahili","name":"斯瓦希里语","flag":"🇹🇿","color":"#1EB53A"},{"code":"hebrew","name":"希伯来语","flag":"🇮🇱","color":"#0038B8"},{"code":"czech","name":"捷克语","flag":"🇨🇿","color":"#11457E"},{"code":"romanian","name":"罗马尼亚语","flag":"🇷🇴","color":"#002B7F"},{"code":"norwegian","name":"挪威语","flag":"🇳🇴","color":"#BA0C2F"},{"code":"danish","name":"丹麦语","flag":"🇩🇰","color":"#C60C30"},{"code":"finnish","name":"芬兰语","flag":"🇫🇮","color":"#002F6C"},{"code":"hungarian","name":"匈牙利语","flag":"🇭🇺","color":"#436F4D"},{"code":"ukrainian","name":"乌克兰语","flag":"🇺🇦","color":"#0057B7"},{"code":"bengali","name":"孟加拉语","flag":"🇧🇩","color":"#006A4E"},{"code":"urdu","name":"乌尔都语","flag":"🇵🇰","color":"#01411C"},{"code":"persian","name":"波斯语","flag":"🇮🇷","color":"#239F40"},{"code":"burmese","name":"缅甸语","flag":"🇲🇲","color":"#FEC34B"},{"code":"khmer","name":"高棉语","flag":"🇰🇭","color":"#032EA1"},{"code":"lao","name":"老挝语","flag":"🇱🇦","color":"#CE1126"},{"code":"mongolian","name":"蒙古语","flag":"🇲🇳","color":"#C4272C"},{"code":"nepali","name":"尼泊尔语","flag":"🇳🇵","color":"#DC143C"},{"code":"sinhala","name":"僧伽罗语","flag":"🇱🇰","color":"#FFBE29"},{"code":"tamil","name":"泰米尔语","flag":"🇮🇳","color":"#FF9933"},{"code":"telugu","name":"泰卢固语","flag":"🇮🇳","color":"#FF9933"},{"code":"marathi","name":"马拉地语","flag":"🇮🇳","color":"#FF9933"},{"code":"gujarati","name":"古吉拉特语","flag":"🇮🇳","color":"#FF9933"},{"code":"kannada","name":"卡纳达语","flag":"🇮🇳","color":"#FF9933"},{"code":"malayalam","name":"马拉雅拉姆语","flag":"🇮🇳","color":"#FF9933"},{"code":"punjabi","name":"旁遮普语","flag":"🇮🇳","color":"#FF9933"},{"code":"catalan","name":"加泰罗尼亚语","flag":"🇪🇸","color":"#FCDD09"},{"code":"basque","name":"巴斯克语","flag":"🇪🇸","color":"#D52B1E"},{"code":"galician","name":"加利西亚语","flag":"🇪🇸","color":"#009CDE"},{"code":"welsh","name":"威尔士语","flag":"🏴","color":"#00B140"},{"code":"irish","name":"爱尔兰语","flag":"🇮🇪","color":"#169B62"},{"code":"icelandic","name":"冰岛语","flag":"🇮🇸","color":"#02529C"},{"code":"croatian","name":"克罗地亚语","flag":"🇭🇷","color":"#FF0000"},{"code":"serbian","name":"塞尔维亚语","flag":"🇷🇸","color":"#C6363C"},{"code":"bulgarian","name":"保加利亚语","flag":"🇧🇬","color":"#00966E"},{"code":"slovak","name":"斯洛伐克语","flag":"🇸🇰","color":"#0B4EA2"},{"code":"slovenian","name":"斯洛文尼亚语","flag":"🇸🇮","color":"#005CE5"},{"code":"lithuanian","name":"立陶宛语","flag":"🇱🇹","color":"#FDB913"},{"code":"latvian","name":"拉脱维亚语","flag":"🇱🇻","color":"#9E3039"},{"code":"estonian","name":"爱沙尼亚语","flag":"🇪🇪","color":"#0072CE"},{"code":"albanian","name":"阿尔巴尼亚语","flag":"🇦🇱","color":"#FF0000"},{"code":"armenian","name":"亚美尼亚语","flag":"🇦🇲","color":"#0033A0"},{"code":"georgian","name":"格鲁吉亚语","flag":"🇬🇪","color":"#FF0000"},{"code":"kazakh","name":"哈萨克语","flag":"🇰🇿","color":"#00AFCA"},{"code":"uzbek","name":"乌兹别克语","flag":"🇺🇿","color":"#0099B5"},{"code":"turkmen","name":"土库曼语","flag":"🇹🇲","color":"#009739"},{"code":"azerbaijani","name":"阿塞拜疆语","flag":"🇦🇿","color":"#00B9E4"},{"code":"amharic","name":"阿姆哈拉语","flag":"🇪🇹","color":"#009A44"},{"code":"hausa","name":"豪萨语","flag":"🇳🇬","color":"#008751"},{"code":"yoruba","name":"约鲁巴语","flag":"🇳🇬","color":"#008751"},{"code":"igbo","name":"伊博语","flag":"🇳🇬","color":"#008751"},{"code":"zulu","name":"祖鲁语","flag":"🇿🇦","color":"#007A4D"},{"code":"afrikaans","name":"南非荷兰语","flag":"🇿🇦","color":"#007A4D"},{"code":"somali","name":"索马里语","flag":"🇸🇴","color":"#4189DD"},{"code":"malagasy","name":"马达加斯加语","flag":"🇲🇬","color":"#007E3A"},{"code":"quechua","name":"克丘亚语","flag":"🇵🇪","color":"#D91023"},{"code":"guarani","name":"瓜拉尼语","flag":"🇵🇾","color":"#D52B1E"},{"code":"maori","name":"毛利语","flag":"🇳🇿","color":"#000000"},{"code":"hawaiian","name":"夏威夷语","flag":"🇺🇸","color":"#002868"},{"code":"yiddish","name":"意第绪语","flag":"🇮🇱","color":"#0038B8"},{"code":"luxembourgish","name":"卢森堡语","flag":"🇱🇺","color":"#00A1DE"},{"code":"macedonian","name":"马其顿语","flag":"🇲🇰","color":"#FF0000"},{"code":"belarusian","name":"白俄罗斯语","flag":"🇧🇾","color":"#CE1720"},{"code":"maltese","name":"马耳他语","flag":"🇲🇹","color":"#CF142B"},{"code":"tibetan","name":"藏语","flag":"🇨🇳","color":"#DE2910"},{"code":"uyghur","name":"维吾尔语","flag":"🇨🇳","color":"#DE2910"},{"code":"dzongkha","name":"宗卡语","flag":"🇧🇹","color":"#FF4E12"},{"code":"dhivehi","name":"迪维希语","flag":"🇲🇻","color":"#D21034"},{"code":"tetum","name":"德顿语","flag":"🇹🇱","color":"#DC241F"},{"code":"fijian","name":"斐济语","flag":"🇫🇯","color":"#69B5E0"},{"code":"samoan","name":"萨摩亚语","flag":"🇼🇸","color":"#002B7F"},{"code":"tongan","name":"汤加语","flag":"🇹🇴","color":"#C10000"},{"code":"kirundi","name":"基隆迪语","flag":"🇧🇮","color":"#CE1126"},{"code":"kinyarwanda","name":"卢旺达语","flag":"🇷🇼","color":"#00A1DE"},{"code":"lingala","name":"林加拉语","flag":"🇨🇩","color":"#007FFF"},{"code":"bambara","name":"班巴拉语","flag":"🇲🇱","color":"#14B53A"},{"code":"wolof","name":"沃洛夫语","flag":"🇸🇳","color":"#00853F"},{"code":"tigrinya","name":"提格雷尼亚语","flag":"🇪🇷","color":"#EA0437"},{"code":"oromo","name":"奥罗莫语","flag":"🇪🇹","color":"#009A44"},{"code":"cherokee","name":"切罗基语","flag":"🇺🇸","color":"#002868"},{"code":"navajo","name":"纳瓦霍语","flag":"🇺🇸","color":"#002868"},{"code":"inuktitut","name":"因纽特语","flag":"🇨🇦","color":"#FF0000"},{"code":"esperanto","name":"世界语","flag":"🌍","color":"#009900"},{"code":"latin","name":"拉丁语","flag":"🏛️","color":"#8B4513"},{"code":"sanskrit","name":"梵语","flag":"🕉️","color":"#FF9933"}];
const LV = [["A1","初学者"],["A2","基础者"],["B1","中级"],["B2","中高级"],["C1","高级"],["C2","精通"]];
const NL = 105;
const NLV = 6;

const UT = [
  {t:'问候与自我介绍',d:'学习如何打招呼和介绍自己',w:['你好','早上好','再见','谢谢','对不起']},
  {t:'数字与时间',d:'学习数字表达和时间的问法',w:['一','二','三','时间','现在']},
  {t:'家庭与关系',d:'学习家庭成员和人际关系的表达',w:['爸爸','妈妈','朋友','家人','爱']},
  {t:'食物与餐饮',d:'学习食物名称和餐厅用语',w:['水','饭','面包','好吃','菜单']},
  {t:'交通与出行',d:'学习交通工具和问路表达',w:['车','火车','飞机','左','右']},
  {t:'购物与消费',d:'学习购物场景中的常用表达',w:['买','多少钱','便宜','贵','打折']},
  {t:'天气与季节',d:'学习描述天气和季节的词汇',w:['晴天','下雨','冷','热','春天']},
  {t:'工作与职业',d:'学习工作相关词汇和表达',w:['工作','公司','老板','同事','会议']},
  {t:'健康与医疗',d:'学习健康相关词汇和表达',w:['医生','医院','药','疼','休息']},
  {t:'爱好与娱乐',d:'学习兴趣爱好相关的表达',w:['音乐','运动','电影','书','旅行']},
  {t:'学习与教育',d:'学习教育场景中的词汇',w:['学校','老师','学生','学习','考试']},
  {t:'科技与网络',d:'学习科技相关的表达',w:['电脑','手机','网络','信息','技术']},
];

function genUnits(cid:string, n:number, s:number): Unit[] {
  const u:Unit[]=[];
  const used=new Set<number>();
  for(let i=0;i<n;i++){
    let ti:number;
    do{ti=(s+i*7)%UT.length}while(used.has(ti)&&used.size<UT.length);
    used.add(ti);
    const t=UT[ti],uid=cid+'-u'+(i+1),nl=2+(i%3);
    const ls:Lesson[]=[];
    const lt:Lesson['type'][] = ['vocabulary','grammar','speaking','listening'];
    for(let l=0;l<nl;l++){
      const lid=uid+'-l'+(l+1),tp=lt[l%4];
      if(tp==='vocabulary') ls.push({id:lid,type:'vocabulary',title:t.w[0]+'相关词汇',completed:false,expReward:20,content:{words:t.w.map((w,j)=>({id:lid+'-w'+(j+1),term:w,translation:w,pronunciation:'/'+w+'/',example:'包含"'+w+'"的例句',exampleTranslation:'Example with"'+w+'"'}))}} as any);
      else if(tp==='grammar') ls.push({id:lid,type:'grammar',title:'基本句型结构',completed:false,expReward:25,content:{rules:[{id:lid+'-r1',title:t.t+'中的基本句型',explanation:'学习'+t.t+'场景中最常用的句型结构。',examples:['关于'+t.w[0]+'的例句A','关于'+t.w[1]+'的例句B']}],exercises:[{id:lid+'-e1',question:'选择正确的表达方式：',options:['选项A','选项B','选项C'],correctAnswer:'选项A',explanation:'这是最常用的表达方式。'},{id:lid+'-e2',question:'以下哪个句子是正确的？',options:['选项A','选项B','选项C'],correctAnswer:'选项B',explanation:'注意语法结构的正确性。'}]}} as any);
      else if(tp==='speaking') ls.push({id:lid,type:'speaking',title:'口语表达练习',completed:false,expReward:30,content:{prompt:'请用所学语言表达关于'+t.t+'的内容。',targetSentence:'我在学习'+t.t+'。',allowedAttempts:3}} as any);
      else ls.push({id:lid,type:'listening',title:'听力理解训练',completed:false,expReward:25,content:{audioUrl:'',transcript:'这是一段关于'+t.t+'的对话。你会听到两个人讨论'+t.w[0]+'和'+t.w[1]+'。',questions:[{id:lid+'-q1',question:'对话中提到了什么？',options:[t.w[0],t.w[2],t.w[3]],correctAnswer:t.w[0]},{id:lid+'-q2',question:'这段对话的主题是什么？',options:[t.t,'天气','购物'],correctAnswer:t.t}]}} as any);
    }
    u.push({id:uid,title:t.t,description:t.d,lessons:ls,progress:Math.floor(Math.random()*80)});
  }
  return u;
}

function genCourse(i:number): Course {
  const li = i % NL;
  const lvi = Math.floor(i / NL) % NLV;
  const lang = L[li];
  const lv = LV[lvi];
  const cid = lang.code + '-' + lv[0] + '-' + i;
  return {
    id: cid, language: lang.code, languageName: lang.name + lv[1],
    flag: lang.flag, level: lv[0], levelName: lv[1],
    description: lv[1] + '水平' + lang.name + '课程',
    totalHours: 40 + lvi * 10, enrolledCount: (i * 9973 + 500) % 15000,
    color: lang.color, units: genUnits(cid, 2 + (i % 3), i),
  };
}

const TOTAL = 100000000;

// Lazy course array via Proxy
const cache = new Map<number, Course>();

const courseProxy: Course[] = new Proxy([] as Course[], {
  get(_target, prop) {
    if (typeof prop === 'string' && /^\d+$/.test(prop)) {
      const idx = +prop;
      if (idx >= TOTAL) return undefined;
      if (!cache.has(idx)) cache.set(idx, genCourse(idx));
      return cache.get(idx);
    }
    if (prop === 'length') return TOTAL;
    if (prop === Symbol.iterator) {
      return function*() {
        for (let i = 0; i < TOTAL; i++) {
          if (!cache.has(i)) cache.set(i, genCourse(i));
          yield cache.get(i)!;
        }
      };
    }
    const val = (Array.prototype as any)[prop];
    if (typeof val === 'function') return val.bind(courseProxy);
    return val;
  },
});

export const courses: Course[] = courseProxy;

// Helper: get all courses for a specific language (efficient, no full iteration)
export function getCoursesByLanguage(langCode: string): Course[] {
  const li = L.findIndex(l => l.code === langCode);
  if (li === -1) return [];
  const result: Course[] = [];
  for (let lvi = 0; lvi < NLV; lvi++) {
    result.push(genCourse(li + lvi * NL));
  }
  return result;
}

// Helper: get unique language list from course data
export function getAvailableLanguages(): { code: string; name: string; flag: string; color: string }[] {
  return L;
}

export const languageLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export const levelDescriptions: Record<string, { name: string; description: string }> = {
  'A1': { name: '初学者', description: '能够理解并使用日常用语和简单句子' },
  'A2': { name: '基础者', description: '能够进行简单的社交对话' },
  'B1': { name: '中级', description: '能够应对工作中简单的语言需求' },
  'B2': { name: '中高级', description: '能够流利地与母语者交流' },
  'C1': { name: '高级', description: '能够有效灵活地运用语言' },
  'C2': { name: '精通', description: '达到接近母语者的水平' },
};