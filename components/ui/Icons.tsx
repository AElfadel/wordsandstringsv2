import { LucideProps, User } from "lucide-react";

type IconProps = {
  fill: string;
  height: number;
  width: number;
};

export const Icons = {
  user: User,
  facebook: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="27"
      height="27"
      viewBox="0 0 48 48"
    >
      <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
      <path
        fill="#fff"
        d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
      ></path>
    </svg>
  ),

  tiktokWhite: () => (
    <svg
      className=""
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      {" "}
      <path
        d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"
        fill="white"
      ></path>{" "}
    </svg>
  ),
  calendar: ({ fill, width, height }: IconProps) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 49 48"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M36.7734 8H34.7734V6C34.7734 5.46957 34.5627 4.96086 34.1877 4.58579C33.8126 4.21071 33.3039 4 32.7734 4C32.243 4 31.7343 4.21071 31.3592 4.58579C30.9842 4.96086 30.7734 5.46957 30.7734 6V8H18.7734V6C18.7734 5.46957 18.5627 4.96086 18.1877 4.58579C17.8126 4.21071 17.3039 4 16.7734 4C16.243 4 15.7343 4.21071 15.3592 4.58579C14.9842 4.96086 14.7734 5.46957 14.7734 6V8H12.7734C11.1821 8 9.65602 8.63214 8.5308 9.75736C7.40558 10.8826 6.77344 12.4087 6.77344 14V38C6.77344 39.5913 7.40558 41.1174 8.5308 42.2426C9.65602 43.3679 11.1821 44 12.7734 44H36.7734C38.3647 44 39.8909 43.3679 41.0161 42.2426C42.1413 41.1174 42.7734 39.5913 42.7734 38V14C42.7734 12.4087 42.1413 10.8826 41.0161 9.75736C39.8909 8.63214 38.3647 8 36.7734 8ZM16.7734 34C16.3779 34 15.9912 33.8827 15.6623 33.6629C15.3334 33.4432 15.0771 33.1308 14.9257 32.7654C14.7743 32.3999 14.7347 31.9978 14.8119 31.6098C14.889 31.2219 15.0795 30.8655 15.3592 30.5858C15.6389 30.3061 15.9953 30.1156 16.3833 30.0384C16.7712 29.9613 17.1734 30.0009 17.5388 30.1522C17.9043 30.3036 18.2166 30.56 18.4364 30.8889C18.6561 31.2178 18.7734 31.6044 18.7734 32C18.7734 32.5304 18.5627 33.0391 18.1877 33.4142C17.8126 33.7893 17.3039 34 16.7734 34ZM32.7734 34H24.7734C24.243 34 23.7343 33.7893 23.3592 33.4142C22.9842 33.0391 22.7734 32.5304 22.7734 32C22.7734 31.4696 22.9842 30.9609 23.3592 30.5858C23.7343 30.2107 24.243 30 24.7734 30H32.7734C33.3039 30 33.8126 30.2107 34.1877 30.5858C34.5627 30.9609 34.7734 31.4696 34.7734 32C34.7734 32.5304 34.5627 33.0391 34.1877 33.4142C33.8126 33.7893 33.3039 34 32.7734 34ZM38.7734 22H10.7734V14C10.7734 13.4696 10.9842 12.9609 11.3592 12.5858C11.7343 12.2107 12.243 12 12.7734 12H14.7734V14C14.7734 14.5304 14.9842 15.0391 15.3592 15.4142C15.7343 15.7893 16.243 16 16.7734 16C17.3039 16 17.8126 15.7893 18.1877 15.4142C18.5627 15.0391 18.7734 14.5304 18.7734 14V12H30.7734V14C30.7734 14.5304 30.9842 15.0391 31.3592 15.4142C31.7343 15.7893 32.243 16 32.7734 16C33.3039 16 33.8126 15.7893 34.1877 15.4142C34.5627 15.0391 34.7734 14.5304 34.7734 14V12H36.7734C37.3039 12 37.8126 12.2107 38.1877 12.5858C38.5627 12.9609 38.7734 13.4696 38.7734 14V22Z" />
    </svg>
  ),
  location: ({ fill, width, height }: IconProps) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5159 8.62958C16.5119 5.66352 20.5575 3.99979 24.7734 4C28.9893 3.99979 33.0349 5.66352 36.031 8.62958C39.027 11.5956 40.7313 15.6243 40.7734 19.84C40.7734 30.8 26.7734 43 26.0734 43.52C25.7112 43.8299 25.2501 44.0001 24.7734 44.0001C24.2967 44.0001 23.8357 43.8299 23.4734 43.52L23.4702 43.5172C22.8241 42.9573 8.77344 30.7808 8.77344 19.84C8.8156 15.6243 10.5199 11.5956 13.5159 8.62958Z"
        fill={fill}
      />
      <path
        d="M24.7734 12C23.389 12 22.0356 12.4105 20.8844 13.1797C19.7333 13.9489 18.8361 15.0421 18.3063 16.3212C17.7765 17.6003 17.6378 19.0078 17.9079 20.3656C18.178 21.7235 18.8447 22.9708 19.8237 23.9497C20.8027 24.9287 22.0499 25.5954 23.4078 25.8655C24.7657 26.1356 26.1731 25.997 27.4522 25.4672C28.7313 24.9373 29.8246 24.0401 30.5937 22.889C31.3629 21.7378 31.7734 20.3845 31.7734 19C31.7734 17.1435 31.0359 15.363 29.7232 14.0503C28.4104 12.7375 26.63 12 24.7734 12ZM24.7734 22C24.1801 22 23.6001 21.8241 23.1067 21.4944C22.6134 21.1648 22.2289 20.6962 22.0018 20.1481C21.7747 19.5999 21.7153 18.9967 21.8311 18.4147C21.9468 17.8328 22.2326 17.2982 22.6521 16.8787C23.0717 16.4591 23.6062 16.1734 24.1882 16.0576C24.7701 15.9419 25.3733 16.0013 25.9215 16.2284C26.4697 16.4554 26.9382 16.8399 27.2678 17.3333C27.5975 17.8266 27.7734 18.4067 27.7734 19C27.7734 19.7956 27.4574 20.5587 26.8948 21.1213C26.3322 21.6839 25.5691 22 24.7734 22Z"
        fill="white"
      />
    </svg>
  ),

  link: ({ fill, width, height }: IconProps) => (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.288 9.28921L9.28799 13.2892C9.19426 13.3822 9.11986 13.4928 9.06909 13.6146C9.01833 13.7365 8.99219 13.8672 8.99219 13.9992C8.99219 14.1312 9.01833 14.2619 9.06909 14.3838C9.11986 14.5056 9.19426 14.6162 9.28799 14.7092C9.38095 14.8029 9.49155 14.8773 9.61341 14.9281C9.73527 14.9789 9.86597 15.005 9.99799 15.005C10.13 15.005 10.2607 14.9789 10.3826 14.9281C10.5044 14.8773 10.615 14.8029 10.708 14.7092L14.708 10.7092C14.8963 10.5209 15.0021 10.2655 15.0021 9.99921C15.0021 9.73291 14.8963 9.47751 14.708 9.28921C14.5197 9.1009 14.2643 8.99512 13.998 8.99512C13.7317 8.99512 13.4763 9.1009 13.288 9.28921Z"
        fill={fill}
      />
      <path
        d="M12.2795 17.3995L10.9995 18.6695C10.281 19.41 9.31498 19.86 8.28583 19.9338C7.25668 20.0076 6.23638 19.6999 5.41954 19.0695C4.98781 18.7138 4.63551 18.2714 4.38538 17.771C4.13526 17.2707 3.99287 16.7234 3.96743 16.1645C3.94198 15.6057 4.03404 15.0477 4.23766 14.5267C4.44128 14.0056 4.75193 13.5331 5.14954 13.1395L6.56954 11.7095C6.66327 11.6166 6.73766 11.506 6.78843 11.3841C6.8392 11.2623 6.86534 11.1316 6.86534 10.9995C6.86534 10.8675 6.8392 10.7368 6.78843 10.615C6.73766 10.4931 6.66327 10.3825 6.56954 10.2895C6.47658 10.1958 6.36598 10.1214 6.24412 10.0707C6.12226 10.0199 5.99155 9.99375 5.85954 9.99375C5.72753 9.99375 5.59682 10.0199 5.47497 10.0707C5.35311 10.1214 5.24251 10.1958 5.14954 10.2895L3.87954 11.5695C2.8097 12.6056 2.15213 13.9946 2.02891 15.4787C1.90569 16.9629 2.3252 18.4413 3.20954 19.6395C3.73442 20.3205 4.39818 20.8819 5.15673 21.2866C5.91528 21.6913 6.75125 21.9299 7.60912 21.9867C8.46699 22.0434 9.32711 21.917 10.1324 21.6157C10.9376 21.3145 11.6695 20.8454 12.2795 20.2395L13.6995 18.8195C13.8878 18.6312 13.9936 18.3759 13.9936 18.1095C13.9936 17.8432 13.8878 17.5879 13.6995 17.3995C13.5112 17.2112 13.2558 17.1055 12.9895 17.1055C12.7232 17.1055 12.4678 17.2112 12.2795 17.3995V17.3995ZM19.6595 3.21955C18.453 2.32601 16.9625 1.90224 15.4664 2.02737C13.9703 2.15251 12.5708 2.818 11.5295 3.89955L10.4495 4.99955C10.3261 5.08929 10.2229 5.20395 10.1466 5.3361C10.0702 5.46826 10.0225 5.61497 10.0065 5.76674C9.99047 5.91851 10.0065 6.07195 10.0535 6.21714C10.1006 6.36232 10.1776 6.49601 10.2795 6.60955C10.3725 6.70328 10.4831 6.77767 10.605 6.82844C10.7268 6.87921 10.8575 6.90535 10.9895 6.90535C11.1216 6.90535 11.2523 6.87921 11.3741 6.82844C11.496 6.77767 11.6066 6.70328 11.6995 6.60955L12.9995 5.29955C13.7141 4.55587 14.679 4.10338 15.7077 4.02951C16.7364 3.95563 17.756 4.26561 18.5695 4.89955C19.0045 5.25535 19.3596 5.6988 19.6117 6.20101C19.8638 6.70322 20.0073 7.25292 20.0328 7.81428C20.0582 8.37564 19.9651 8.93607 19.7595 9.45905C19.554 9.98202 19.2405 10.4558 18.8395 10.8495L17.4195 12.2795C17.3258 12.3725 17.2514 12.4831 17.2006 12.605C17.1499 12.7268 17.1237 12.8575 17.1237 12.9895C17.1237 13.1216 17.1499 13.2523 17.2006 13.3741C17.2514 13.496 17.3258 13.6066 17.4195 13.6995C17.5125 13.7933 17.6231 13.8677 17.745 13.9184C17.8668 13.9692 17.9975 13.9953 18.1295 13.9953C18.2616 13.9953 18.3923 13.9692 18.5141 13.9184C18.636 13.8677 18.7466 13.7933 18.8395 13.6995L20.2595 12.2795C20.8637 11.6697 21.3314 10.9384 21.6316 10.1341C21.9318 9.32982 22.0577 8.47095 22.001 7.61435C21.9443 6.75776 21.7062 5.92299 21.3025 5.16534C20.8989 4.40769 20.3388 3.74445 19.6595 3.21955V3.21955Z"
        fill={fill}
      />
    </svg>
  ),
  arrow: ({ fill, width, height }: IconProps) => (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.518213 8.13127C0.200766 8.39735 0.159128 8.87039 0.425212 9.18784C0.691295 9.50529 1.16434 9.54693 1.48179 9.28084L0.518213 8.13127ZM9.74712 2.06621C9.78344 1.6536 9.47839 1.28966 9.06577 1.25334L2.34177 0.661485C1.92915 0.625166 1.56522 0.930216 1.5289 1.34283C1.49258 1.75545 1.79763 2.11939 2.21025 2.15571L8.18714 2.6818L7.66104 8.65869C7.62472 9.07131 7.92977 9.43525 8.34239 9.47157C8.75501 9.50789 9.11895 9.20284 9.15527 8.79022L9.74712 2.06621ZM1.48179 9.28084L9.4818 2.57524L8.51822 1.42566L0.518213 8.13127L1.48179 9.28084Z"
        fill={fill}
      />
    </svg>
  ),
  edit: ({ fill, width, height }: IconProps) => (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 36 36`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.9139 1.875H20.25C20.8713 1.875 21.375 2.37868 21.375 3C21.375 3.62132 20.8713 4.125 20.25 4.125H18C14.4327 4.125 11.8703 4.12739 9.92036 4.38956C8.00276 4.64737 6.84668 5.13771 5.99219 5.99219C5.13771 6.84668 4.64737 8.00276 4.38956 9.92036C4.12739 11.8703 4.125 14.4327 4.125 18C4.125 21.5673 4.12739 24.1297 4.38956 26.0796C4.64737 27.9972 5.13771 29.1533 5.99219 30.0078C6.84668 30.8623 8.00276 31.3526 9.92036 31.6104C11.8703 31.8726 14.4327 31.875 18 31.875C21.5673 31.875 24.1297 31.8726 26.0796 31.6104C27.9972 31.3526 29.1533 30.8623 30.0078 30.0078C30.8623 29.1533 31.3526 27.9972 31.6104 26.0796C31.8726 24.1297 31.875 21.5673 31.875 18V15.75C31.875 15.1287 32.3787 14.625 33 14.625C33.6213 14.625 34.125 15.1287 34.125 15.75V18.0861C34.125 21.5487 34.125 24.2622 33.8404 26.3794C33.549 28.5465 32.941 30.2566 31.5988 31.5988C30.2566 32.941 28.5465 33.549 26.3794 33.8404C24.2622 34.125 21.5487 34.125 18.0861 34.125H17.9139C14.4513 34.125 11.7378 34.125 9.62056 33.8404C7.45345 33.549 5.74342 32.941 4.4012 31.5988C3.05899 30.2566 2.45098 28.5465 2.15962 26.3794C1.87497 24.2622 1.87498 21.5487 1.875 18.0861V17.9139C1.87498 14.4513 1.87497 11.7378 2.15962 9.62056C2.45098 7.45345 3.05899 5.74342 4.4012 4.4012C5.74342 3.05899 7.45345 2.45098 9.62056 2.15962C11.7378 1.87497 14.4513 1.87498 17.9139 1.875ZM25.1558 3.41387C27.2076 1.36204 30.5343 1.36204 32.5861 3.41387C34.638 5.4657 34.638 8.79237 32.5861 10.8442L22.614 20.8164C22.0571 21.3734 21.7082 21.7223 21.3189 22.0259C20.8603 22.3836 20.3642 22.6902 19.8392 22.9404C19.3935 23.1528 18.9254 23.3088 18.1782 23.5578L13.8214 25.0101C13.017 25.2782 12.1302 25.0689 11.5307 24.4693C10.9311 23.8698 10.7218 22.983 10.9899 22.1786L12.4422 17.8218C12.6912 17.0746 12.8472 16.6065 13.0596 16.1608C13.3098 15.6358 13.6164 15.1397 13.9741 14.6811C14.2777 14.2918 14.6267 13.9429 15.1837 13.386L25.1558 3.41387ZM30.9951 5.00486C29.822 3.83171 27.9199 3.83171 26.7468 5.00486L26.1819 5.56979C26.2159 5.71359 26.2635 5.88491 26.3298 6.076C26.5448 6.69558 26.9516 7.51157 27.72 8.27999C28.4884 9.04841 29.3044 9.4552 29.924 9.67015C30.1151 9.73645 30.2864 9.78409 30.4302 9.81814L30.9951 9.25321C32.1683 8.08006 32.1683 6.17801 30.9951 5.00486ZM28.6577 11.5906C27.8838 11.2578 26.9822 10.7242 26.129 9.87098C25.2758 9.01777 24.7422 8.11623 24.4094 7.34228L16.8263 14.9254C16.2015 15.5502 15.9565 15.7979 15.7482 16.0649C15.4911 16.3946 15.2706 16.7513 15.0907 17.1288C14.945 17.4344 14.833 17.7644 14.5536 18.6026L13.9058 20.5461L15.4539 22.0942L17.3974 21.4464C18.2356 21.167 18.5656 21.0549 18.8712 20.9093C19.2487 20.7294 19.6054 20.5089 19.9351 20.2518C20.2021 20.0435 20.4498 19.7985 21.0746 19.1737L28.6577 11.5906Z"
        fill={fill}
      />
    </svg>
  ),
  delete: ({ fill, width, height }: IconProps) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.26401 6.45975C4.60842 6.43679 4.90624 6.69738 4.9292 7.04179L5.31248 12.7911C5.38737 13.9143 5.44072 14.6958 5.55786 15.2838C5.67149 15.8542 5.8301 16.1561 6.05794 16.3692C6.28579 16.5824 6.59758 16.7206 7.17425 16.796C7.76875 16.8738 8.55209 16.875 9.67779 16.875H10.3223C11.448 16.875 12.2313 16.8738 12.8258 16.796C13.4025 16.7206 13.7143 16.5824 13.9421 16.3692C14.17 16.1561 14.3286 15.8542 14.4422 15.2838C14.5593 14.6958 14.6127 13.9143 14.6876 12.7911L15.0709 7.04179C15.0938 6.69738 15.3916 6.43679 15.736 6.45975C16.0805 6.48271 16.3411 6.78053 16.3181 7.12494L15.9319 12.9181C15.8606 13.987 15.8031 14.8505 15.6681 15.528C15.5278 16.2324 15.2891 16.8208 14.7961 17.2821C14.3031 17.7433 13.7001 17.9423 12.9879 18.0355C12.3029 18.1251 11.4375 18.125 10.3662 18.125H9.63385C8.56252 18.125 7.69716 18.1251 7.01212 18.0355C6.29991 17.9423 5.69696 17.7433 5.20396 17.2821C4.71097 16.8208 4.47228 16.2324 4.33195 15.528C4.19697 14.8505 4.13942 13.987 4.06818 12.9181L3.68197 7.12494C3.65901 6.78053 3.9196 6.48271 4.26401 6.45975Z"
        fill={fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.62941 1.87503L8.5911 1.87502C8.41077 1.8749 8.25367 1.8748 8.10532 1.89849C7.51923 1.99208 7.01207 2.35762 6.73795 2.88403C6.66856 3.01728 6.61897 3.16636 6.56206 3.33747L6.54996 3.37382L6.46905 3.61654C6.45323 3.66401 6.44882 3.67709 6.44498 3.6877C6.29905 4.09113 5.9207 4.36383 5.49182 4.3747C5.48054 4.37498 5.46673 4.37503 5.4167 4.37503H2.91663C2.57145 4.37503 2.29163 4.65485 2.29163 5.00003C2.29163 5.34521 2.57145 5.62503 2.91663 5.62503L5.42383 5.62503L5.43778 5.62503H14.5623L14.5762 5.62503L17.0834 5.62503C17.4285 5.62503 17.7084 5.34521 17.7084 5.00003C17.7084 4.65485 17.4285 4.37503 17.0834 4.37503H14.5834C14.5333 4.37503 14.5195 4.37498 14.5082 4.3747C14.0794 4.36383 13.701 4.09111 13.5551 3.68768C13.5513 3.67715 13.5468 3.66378 13.531 3.61654L13.4501 3.37382L13.438 3.33745C13.3811 3.16634 13.3315 3.01727 13.2621 2.88403C12.988 2.35762 12.4808 1.99208 11.8947 1.89849C11.7464 1.8748 11.5893 1.8749 11.409 1.87502L11.3706 1.87503H8.62941ZM7.62044 4.1129C7.58771 4.20337 7.54968 4.29085 7.50675 4.37503H12.4933C12.4504 4.29085 12.4123 4.20338 12.3796 4.11292L12.3474 4.01846L12.2642 3.7691C12.1883 3.54117 12.1708 3.49469 12.1534 3.46137C12.0621 3.2859 11.893 3.16405 11.6976 3.13285C11.6605 3.12693 11.6109 3.12503 11.3706 3.12503H8.62941C8.38915 3.12503 8.33953 3.12693 8.30242 3.13285C8.10706 3.16405 7.93801 3.2859 7.84663 3.46137C7.82928 3.49469 7.81179 3.54118 7.73581 3.7691L7.65264 4.01861C7.64012 4.05619 7.63038 4.08543 7.62044 4.1129Z"
        fill={fill}
      />
    </svg>
  ),
};