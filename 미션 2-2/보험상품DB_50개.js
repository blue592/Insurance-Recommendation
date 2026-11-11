/* 보험추천 기획서 기반 50개 조사 후보 DB (2026-11-11)
 * 제품명/대분류는 공식 보험사 상품목록 기반. 각 상품의 판매상태·가입연령·약관·특약을
 * 개별 검증하지 않았으므로 모든 항목은 recommendationEligible=false.
 * 임의로 보험금, 나이, 보장 확정 여부를 생성하지 않는다.
 * 단일 HTML에 이 파일 내용을 <script> 태그 내부로 복사하여 내장할 수 있다.
 */
const INSURANCE_PRODUCT_DB = (() => {
  const groups = [
    {company:'삼성화재',url:'https://www.samsungfire.com/m/submain_product.html',items:[
      ['다이렉트 AI맞춤보장보험','건강/상해','건강,상해,생활위험'],
      ['다이렉트 실손의료비보험','실손','실손의료비,입원,통원'],
      ['다이렉트 오토바이 운전자보험','운전자','오토바이,운전자,상해'],
      ['자녀보험 꿈나무','어린이','자녀,질병,상해'],
      ['운전자보험 안전운전 파트너 플러스','운전자','교통사고,운전자,상해']
    ]},
    {company:'현대해상',url:'https://mdirect.hi.co.kr/service.do?m=074b8f3cf5',items:[
      ['굿앤굿어린이종합보험Q(태아)','어린이/태아','태아,출생,어린이'],
      ['굿앤굿어린이종합보험Q(0~15세)','어린이','어린이,질병,상해'],
      ['퍼펙트건강보험','건강','암,뇌,심장,건강'],
      ['운전자보험','운전자','교통사고,운전자'],
      ['굿앤굿우리펫보험(강아지)','펫','반려견,질병,상해']
    ]},
    {company:'DB손해보험',url:'https://idongbu.co.kr/FMMALV5700.do',items:[
      ['참좋은운전자상해보험','운전자','운전자,상해,교통사고'],
      ['아이(I)러브(LOVE)플러스건강보험','어린이/건강','어린이,건강,질병'],
      ['참좋은더보장간병보험','간병','간병,장기요양'],
      ["New I'mOK암보험",'암','암,진단,치료'],
      ['펫블리 반려묘보험','펫','고양이,반려묘,질병']
    ]},
    {company:'KB손해보험',url:'https://www.kbinsure.co.kr/CU400000001.ec?category=insurance',items:[
      ['KB 9회주는 암보험Plus','암','암,진단,치료'],
      ['KB손보간편가입실손의료비보장보험','실손','실손의료비,유병자'],
      ['KB 금쪽같은 펫보험(고양이)','펫','반려묘,고양이,질병'],
      ['하루운전자보험(1~7일)','운전자','단기,운전자,교통사고'],
      ['KB 다이렉트 금쪽같은펫보험(강아지)','펫','반려견,강아지,질병']
    ]},
    {company:'메리츠화재',url:'https://www.meritzdirect.com/main.do',items:[
      ['올바른 100세건강보험','건강','암,뇌혈관,심장'],
      ['올케어 보장 꽉 채운 암보험','암','암,진단,치료'],
      ['올케어 꽉 채운 치아보험','치아','치아,보존치료,보철치료'],
      ['내Mom같은 어린이보험','어린이','어린이,질병,상해'],
      ['메리츠 운전자 상해종합보험','운전자','운전자,교통사고,상해']
    ]},
    {company:'롯데손해보험',url:'https://online.lotteins.co.kr/web/C/C/store/main.jsp',items:[
      ['let:play 자녀보험(도담도담)','어린이','어린이,질병,상해'],
      ['종합건강보험','건강','건강,질병,상해'],
      ['암플랜(비갱신형)','암','암,진단,치료'],
      ['간병비플랜(간편맞춤)','간병','간병,치매,장기요양'],
      ['운전자보험','운전자','운전자,교통사고']
    ]},
    {company:'흥국화재',url:'https://www.heungkukfire.co.kr/FRW/gongsi_price/index.do',items:[
      ['흥Good 상급케어 UP 건강보험(26.05)','건강','질병,건강,암'],
      ['흥Good 든든한 325 암만생각해도 간편종합보험(26.05)','간편건강','암,간편가입,건강'],
      ['흥Good 모두 담은 암보험 PLUS','암','암,수술,치료'],
      ['흥국화재 다이렉트 자동차보험','자동차','자동차,사고,배상'],
      ['흥국화재 운전자보험','운전자','운전자,교통사고']
    ]},
    {company:'한화손해보험',url:'https://www.hanwhadirect.com/',items:[
      ['시그니처 여성 건강보험','여성/건강','여성질환,여성암,건강'],
      ['다이렉트 3200운전자보험','운전자','운전자,교통사고'],
      ['다이렉트 내가고른 암보험','암','암,항암,진단'],
      ['한화 운전자상해보험','운전자/상해','운전자,상해'],
      ['다이렉트 여성건강보험','여성/건강','여성질환,암,임신']
    ]},
    {company:'한화생명',url:'https://direct.hanwhalife.com/app/products/2',items:[
      ['H건강플러스보험','건강','암,뇌혈관,심장'],
      ['시그니처H암보험','암','암,항암,치료'],
      ['e건강보험(암·뇌·심장)','건강','암,뇌,심장'],
      ['하나로H종신보험','종신','사망,종신'],
      ['시그니처 H통합건강보험','건강','암,뇌,심장']
    ]},
    {company:'신한라이프',url:'https://www.shinhanlife.co.kr/hp/cdhi0260t01.do',historical:true,items:[
      ['VIP생활비주는암보험','암','암,진단'],
      ['신한간병비받는건강보험','간병','간병,건강'],
      ['신한간편한3大건강보험','간편건강','암,뇌,심장'],
      ['진심을품은간편한찐치매보험','치매','치매,간병'],
      ['신한인터넷암보험','암','암,진단']
    ]}
  ];
  return groups.flatMap((g, gi) => g.items.map(([name,type,keywords],i) => ({
    id:`INS-${String(gi*5+i+1).padStart(3,'0')}`,
    insurer:g.company, productName:name, insuranceType:type,
    mainCoverageKeywords:keywords.split(','),
    mainCoveragesVerified:[], verifiedRiders:[],
    ageMin:null, ageMax:null, eligibleGender:'미확인', conditionKeywords:[],
    officialSourceUrl:g.url, sourceScope:'보험사 공식 상품목록 또는 공시',
    researchedAt:'2026-11-11', verifiedAt:null,
    saleStatus:g.historical?'판매중지 이력 확인':'현재 판매 개별 확인 필요',
    validationStatus:g.historical?'excluded_discontinued':'pending_individual_review',
    recommendationEligible:false,
    verificationNotes:g.historical?'판매중지 기록에 기재되어 추천에서 제외':'동일 제품/현재 판매/보장명/약관/정확한 가입연령 교차 검증 전',
  })));
})();

// 추천 엔진에서 반드시 아래 필터를 먼저 적용할 것.
const ELIGIBLE_INSURANCE_PRODUCTS = INSURANCE_PRODUCT_DB.filter(p => p.recommendationEligible === true);
