import HorizonLine from "./HorizonLine";

function TotalAccount() {
  //더미 총지출 나중에 바꿀꺼  
  const totalAccount = "5000*";

    return (
      <>
        <HorizonLine hasText={false}/>
        <h4 className=''>총 지출 금액</h4>        
        {/* <HorizonLine hasText={true} text="글자" /> */}
        <div className="">
          이번 달의 총 지출 금액은 {totalAccount} 원 입니다.
        </div>
      </>
    );
  }

export default TotalAccount;  