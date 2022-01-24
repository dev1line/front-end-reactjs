import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, CardHeader, Heading, Text, Flex } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import FoldableText from 'components/FoldableText'

const Wrapper = styled(Flex)`
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex: 1;
    margin-top: 0px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    flex: 2;
  }
`

const StyledCardbody = styled(CardBody)`
  div:first-child {
    margin-top: 0px;
  }
`

const FAQ = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <Heading scale="lg">{t('Details')}</Heading>
        </CardHeader>
        <StyledCardbody>
          <FoldableText title={t('Flash Loan là gì ?')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              {t(
                'Flash Loan – vay tức thời là một chức năng trong một số giao thức DeFi phổ biến cho phép bạn vay tài sản tiền điện tử mà không cần thế chấp, với điều kiện là khoản nợ sẽ được trả lại trong cùng một khối giao dịch',
              )}
            </Text>
          </FoldableText>
          <FoldableText title={t('Flash Loan được sử dụng trong trường hợp nào ?')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Arbitration trade ( Giao dịch chênh lệch giá) Kiếm lợi nhuận từ chênh lệch tỷ giá hối đoái của một tài sản trên các nền tảng giao dịch khác nhau. Các khoản vay tức thời trở thành nguồn tài chính chi phí thấp cho các hoạt động này theo sơ đồ sau',
              )}
            </Text>
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Tự thanh lý các vị thế nợ ( Self-liquidation of debt positions) Khi giá trị của tài sản thế chấp giảm xuống dưới giá trị khoản nợ của người đi vay, các giao thức cho vay sẽ kích hoạt quy trình thanh lý tự động. Một phần của tài sản thế chấp được bán để trả nợ, trong khi phí phạt thanh lý được tính, chẳng hạn như trên Aave là 5% hoặc 10% (tùy thuộc vào loại tài sản thế chấp) và trong trường hợp Vaults của MakerDAO phí dịch vụ này là 13%.',
              )}
            </Text>

            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Thay thế tài sản thế chấp nhanh chóng (Quick replacement of collateral) Có thể phải thay thế tài sản thế chấp tiền vay, ví dụ, khi giá tài sản thế chấp giảm, khi rủi ro bị thanh lý tăng lên. Trong trường hợp này, sẽ hợp lý khi thay thế tài sản đang giảm bằng một tài sản tiền điện tử đang phát triển hoặc ít biến động hơn. Việc thay thế tài sản thế chấp thông thường yêu cầu trả nợ đầy đủ và sau đó mở lại, điều này làm tăng phí giao dịch và yêu cầu trả nợ đầy đủ. Các khoản vay nhanh cho phép bạn thực hiện điều này nhanh hơn và rẻ hơn nhiều bằng cách kết hợp tất cả các giao dịch trong một khối.',
              )}
            </Text>

            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Tái cấp vốn nhanh các khoản vay (Fast refinancing of loans) Lãi suất cho vay trên các nền tảng DeFi khác nhau liên tục thay đổi tùy thuộc vào điều kiện thị trường và tính thanh khoản sẵn có. Flash Loan đã được chứng minh là một công cụ thuận tiện để “chuyển” tín dụng sang các nền tảng với tỷ lệ thấp hơn, bao gồm cả việc thay thế tài sản thế chấp bằng một tài sản khác.',
              )}
            </Text>
          </FoldableText>
          <FoldableText title={t('Làm thế nào để sử dụng Flash Loan?')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              {t(
                'Ban đầu, tính năng cho vay tức thì chỉ dành cho các nhà phát triển. Không có giao diện người dùng công khai và chỉ có thể truy cập vào chức năng này thông qua các hợp đồng thông minh. Tuy nhiên, vào năm 2020, các dịch vụ của bên thứ ba đã xuất hiện cung cấp quyền truy cập vào các khoản vay tức thì cho những người dùng không hiểu rõ về ngôn ngữ lập trình Solidity.',
              )}
            </Text>
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'CollateralSwap',
              )}
            </Text>

            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'DeFi Saver',
              )}
            </Text>

            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Furucombo',
              )}
            </Text>
           
          </FoldableText>
          <FoldableText title={t('Flash Loan có trong các hệ sinh thái thay thế khác không?')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Với sự phổ biến ngày càng tăng của các nền tảng blockchain tương thích với EVM (Binance Smart Chain, Solana, Avalanche, Polygon, Fantom) trong nửa đầu năm 2021, chức năng tín dụng flash đã có sẵn cho người dùng của các mạng này.',
              )}
            </Text>
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Vào tháng 4 năm 2021, giao thức Aave được triển khai trên mạng Polygon . Kể từ đó, người dùng đã có thể sử dụng các khoản vay tín chấp ngay lập tức theo cách giống như trước đây trên mạng Ethereum với cùng một khoản phí 0,09%. Tất nhiên, với sự khác biệt rằng phí gas cho các giao dịch trên mạng Polygon vô cùng rẻ.',
              )}
            </Text>

            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Đồng thời, vào tháng 4 năm 2021, dự án CREAM Finance đã cung cấp phiên bản hỗ trợ Flash Loan trên Binance Smart Chain. Sau đó, tính năng này có sẵn trên mạng Polygon và Fantom. Đồng thời, Phí giao dịch của giao thức CREAM chỉ là 0,03%.',
              )}
            </Text>

            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Các nền tảng cho vay nhanh khác trên mạng Polygon bao gồm UniLend Finance. Một khoản vay không bảo đảm của mã thông báo MATIC có sẵn cho người dùng với phí 0,05%.',
              )}
            </Text>

            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Trên mạng Solana , nền tảng đích của Giao thức Solaris sẽ cung cấp Flash Loan. Kể từ mùa hè năm 2021, ứng dụng vẫn đang trong giai đoạn alpha. ',
              )}
            </Text>

            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Các khoản cho vay tức thì từ giao thức cho vay của Benqi Finance, sắp ra mắt trên mạng Avalanche, cũng đang được phát triển.',
              )}
            </Text>

          </FoldableText>
          <FoldableText title={t('Các nguy cơ của Flash Loan ?')} mt="24px">
         
            <Text fontSize="14px" color="textSubtle">
            -{' '}
              {t('Các lợi thế của Flash Loan bắt đầu được sử dụng không chỉ bởi các nhà phát triển và nhà giao dịch tiền điện tử mà còn cả tội phạm mạng. Vào tháng 2 năm 2020, hai cuộc tấn công vào giao thức DeFi đã được thực hiện bằng cách sử dụng các khoản vay nhanh với tổng thiệt hại là 1 triệu USD. Chúng đã khai thác một lỗ hổng trong giao thức bZx, cho phép thao túng giá của tài sản tiền điện tử và tăng giả tạo để thu lợi nhuận. . Bản thân các khoản vay tức thời không có lỗ hổng bảo mật, nhưng được coi là nguồn tài trợ rất rẻ cho các cuộc tấn công.')}
            </Text>

            <Text fontSize="14px" color="textSubtle">
            -{' '}
              {t('Trong suốt năm 2020, các cuộc tấn công tín dụng nhanh ( Flash Loan Attacks) đã trở thành một trong những cách được sử dụng phổ biến nhất để đánh cắp tiền từ các giao thức DeFi khác nhau. Hầu hết các cuộc tấn công đều thực hiện các lỗ hổng bị khai thác liên quan đến sự không đáng tin cậy của các giá trị được sử dụng và khả năng thao túng giá tài sản.')}
            </Text>

            <Text fontSize="14px" color="textSubtle">
            -{' '}
              {t('Vào mùa xuân năm 2021, các khoản vay tức thì có sẵn trên một số mạng tương thích với EVM cùng một lúc – và điều này đã dẫn đến một loạt các cuộc tấn công vào các giao thức DeFi, chủ yếu trên mạng Binance Smart Chain (BSC) .')}
            </Text>

            <Text fontSize="14px" color="textSubtle">
            -{' '}
              {t('Chỉ tính riêng trong tháng 5 năm 2021, do hậu quả của các cuộc tấn công vào mạng BSC, các dịch vụ phi tập trung đã mất tổng cộng 167 triệu đô la. Các cuộc tấn công lớn nhất là vào các dự án Belt Finance (thiệt hại lên tới 50 triệu đô la) và Pancake Bunny, mất đô la. 45 triệu tài sản. Các nạn nhân khác bao gồm BurgeSwap. ApeRocket, bEarnFi và một số dự án DeFi dựa trên BSC khác.')}
            </Text>
          </FoldableText>
        </StyledCardbody>
      </Card>
    </Wrapper>
  )
}

export default FAQ
