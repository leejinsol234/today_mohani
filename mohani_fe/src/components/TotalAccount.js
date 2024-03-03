import HorizonLine from "./HorizonLine";

function TotalAccount() {
  //더미 총지출 나중에 바꿀꺼  
  const totalAccount = "5000*";

    return (
      <>
        <HorizonLine hasText={false}/>
        <h4 className=''>이 달의 수익</h4>
        <div className="">
          이번 달의 총 수입은 {totalAccount} 원 입니다.
        </div>        
        {/* <HorizonLine hasText={true} text="글자" /> */}
        <h4 className=''>이 달의 지출</h4>
        <div className="">
          이번 달의 총 지출은 {totalAccount} 원 입니다.
        </div>
      </>
    );
  }

export default TotalAccount;  