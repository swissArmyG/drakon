import LazyLoad from 'react-lazy-load';

export const Image = ({ logoPath, position, size }) => {
  const sizeConfig = {
    sm: {
      width: '100px',
      height: '50px',
    },
    m: {
      width: '100px',
      heigt: '100px'
    },
    l: {
      width: '300px',
      height: '300px',
    },
  }

  return (
    <LazyLoad>
      <div 
        style={{
          ...sizeConfig[size],
          textAlign: 'center',
          marginRight: '10px',
          backgroundImage: `url(${logoPath})`,
          backgroundSize: 'contain',
          backgroundPosition: `${position ? position : 'center'}`,
          backgroundRepeat: 'no-repeat',
          minHeight: '100px'
        }}>
      </div>
    </LazyLoad>
  )
}